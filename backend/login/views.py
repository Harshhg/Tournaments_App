from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from django.core.mail import send_mail
from rest_framework.response import Response
from .models import Account, OTP, OTPConfiguration
from rest_framework.authtoken.models import Token
from .serializers import RegistrationSerializer, UserLoginSerializer, UserSerializer, ProfileSerializer, OTPSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import datetime
import string, random
from tournament_app.settings import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_HOST
from .email_template import HTML_PART, SUBJECT



@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def registration_view(request):
    try:
        serializer = RegistrationSerializer(data=request.data)
        response = {}
        if serializer.is_valid():
            account = serializer.save()
            response['data'] = {'email': account.email}
            response['message'] = 'Successfully Registered !!'
            response['status'] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
        else:
            response['data'] = ''
            response['message'] = serializer.errors
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 1
            response['exception_status'] = 0
        return Response(response)
    except Exception as e:
        response['data'] = ''
        response['message'] = str(e)
        response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
        response['error_status'] = 0
        response['exception_status'] = 1
        return Response(response)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    try:
        serializer = UserLoginSerializer(data=request.data)
        response = {}
        if serializer.is_valid():
            email = request.data['email']
            password = request.data['password']
            # user = authenticate(email=serializer.validated_data["email"],
            #                     password=serializer.validated_data["password"], token=None)
            user = authenticate(email=email, password=password)
            if user:
                token = Token.objects.get(user=user)

                response['data'] = {'email': user.email, 'token': token.key}
                response['message'] = 'Login Successful !!'
                response['status'] = status.HTTP_201_CREATED
                response['error_status'] = 0
                response['exception_status'] = 0
            else:
                response['data'] = ''
                response['message'] = 'Invalid Credentials!'
                response['status'] = status.HTTP_401_UNAUTHORIZED
                response['error_status'] = 1
                response['exception_status'] = 0
        else:
            response['data'] = ''
            response['message'] = 'Enter a valid email address'
            response['status'] = status.HTTP_401_UNAUTHORIZED
            response['error_status'] = 1
            response['exception_status'] = 0
        return Response(response)
    except Exception as e:
        response['data'] = ''
        response['message'] = str(e)
        response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
        response['error_status'] = 0
        response['exception_status'] = 1
        return Response(response)


class ProfileViewset(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    # get request to fetch user details by ID
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def retrieve_profile(self, request, pk=None):
        response = {}
        try:
            queryset = Account.objects.get(id=request.user.id)
            serializer = UserSerializer(queryset,context={"request": request})
            response["data"] = serializer.data
            response['message'] = 'Successful '
            response["status"] = status.HTTP_201_CREATED
            response['error_status'] = 0
            response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 1
            response['exception_status'] = 1
        return Response(response)

    @action(detail=True, methods=['put'],permission_classes=[IsAuthenticated])
    def profile_update(self, request, pk=None):
        response = {}
        try:
            queryset = Account.objects.get(id=request.user.id)
            serializer = ProfileSerializer(queryset, data=request.data, partial=True)
            if serializer.is_valid():
                response["data"] = ''
                response['message'] = 'Profile Updated'
                response["status"] = status.HTTP_201_CREATED
                response['error_status'] = 0
                response['exception_status'] = 0
                serializer.save()
            else:
                response["data"] = ''
                response['message'] = 'Enter Valid inputs '
                response["status"] = status.HTTP_401_UNAUTHORIZED
                response['error_status'] = 1
                response['exception_status'] = 0
                return Response(response)
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)

# ------------------------------------ Forgot Password ------------------------------------------- #


# --- SEND OTP TO EMAIL --- #
def send_email(otp, receiver):
    otpConfigurationQuerySet = OTPConfiguration.objects.all()[0]
    OTP_EXPIRE_TIME = otpConfigurationQuerySet.otp_expire_time

    import smtplib, ssl
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    sender_email = EMAIL_HOST_USER
    password = EMAIL_HOST_PASSWORD
    receiver_email = receiver

    message = MIMEMultipart("alternative")
    message["Subject"] = SUBJECT
    message["From"] = sender_email
    message["To"] = receiver_email

    text = """\
    """
    html = HTML_PART.format(otp,OTP_EXPIRE_TIME)

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(EMAIL_HOST, 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )


# --- GENERATE RANDOM OTP --- #
def generateRandomOTP():
    otpConfigurationQuerySet = OTPConfiguration.objects.all()[0]
    OTP_TYPE = otpConfigurationQuerySet.otp_type
    OTP_LENGTH = otpConfigurationQuerySet.otp_length

    if OTP_TYPE == 0:
        otp = ''.join(random.choices(string.digits, k=OTP_LENGTH))
    elif OTP_TYPE == 1:
      otp = ''.join(random.choices(string.digits + string.ascii_letters + string.digits , k=OTP_LENGTH))
    elif OTP_TYPE == 2:
        otp = ''.join(random.choices(string.digits + string.ascii_lowercase + string.digits, k=OTP_LENGTH))
    elif OTP_TYPE == 3:
        otp = ''.join(random.choices(string.digits + string.ascii_uppercase + string.digits, k=OTP_LENGTH))

    # check if that otp does not exist (in case of multiple request at same time)
    otpqueryset = OTP.objects.filter(otp=otp).count()
    if otpqueryset > 0:    # Unique OTP
        otp = generateRandomOTP()
    return otp


# --- API TO GENERATE OTP --- #
@api_view(["POST"])
@permission_classes([AllowAny])
def generate_otp(request):
    try:
        response={}
        email = request.data.get('email')

        # ----- Verify Email exists or not ----- #
        loginQuerySet = Account.objects.filter(email=email).exists()
        if loginQuerySet == False:
            response['data'] = ''
            response['message'] = 'Email Address Does Not Exists !'
            response['status'] = status.HTTP_401_UNAUTHORIZED
            response['error_status'] = 1
            response['exception_status'] = 0
            return Response(response)
        # ------------------------------- #


        otp = generateRandomOTP()
        otpGenerateTime = datetime.datetime.utcnow() + datetime.timedelta(hours=5.5)
        data = {'email': email, 'otp':otp, 'time':otpGenerateTime}
        serializer = OTPSerializer(data=data)

        # check if otp already generated, then update OTP and TIME
        otpQuerySetCheck = OTP.objects.filter(email=email).exists()
        if otpQuerySetCheck:
            otpQuerySet = OTP.objects.get(email=email)
            otpQuerySet.otp = otp
            otpQuerySet.time = otpGenerateTime
            otpQuerySet.save()
        else:
            if serializer.is_valid():
                serializer.save()

        # ---- SEND OTP TO EMAIL ------  #
        send_email(otp,email)

        response['data'] = ''
        response['message'] = 'OTP has been sent to your mail!'
        response['status'] = status.HTTP_201_CREATED
        response['error_status'] = 0
        response['exception_status'] = 0

    except Exception as e:
        response['data'] = ''
        response['message'] = str(e)
        response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
        response['error_status'] = 0
        response['exception_status'] = 1
    return Response(response)


# --- API TO VERIFY OTP --- #
@api_view(["POST"])
@permission_classes([AllowAny])
def verify_otp(request):
    try:
        otpConfigurationQuerySet = OTPConfiguration.objects.all()[0]
        OTP_EXPIRE_TIME = otpConfigurationQuerySet.otp_expire_time

        response={}
        email = request.data.get('email')
        otp = request.data.get('otp')
        otpVerifyTime = datetime.datetime.utcnow() + datetime.timedelta(hours=5.5)

        otpCheckQuerySet = OTP.objects.filter(email=email, otp=otp)
        if otpCheckQuerySet.count() == 0:
            response['data'] = ''
            response['message'] = 'Invalid OTP !'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 1
            response['exception_status'] = 0
            return Response(response)

        otpQuerySet = otpCheckQuerySet[0]
        otpQuerySetTime = otpQuerySet.time.replace(tzinfo=None)
        otpEnteredTime = (otpVerifyTime - otpQuerySetTime).seconds/60   # (in Minutes)

        if otpEnteredTime > OTP_EXPIRE_TIME:  # OTP EXPIRED
            response['data'] = ''
            response['message'] = 'OTP Expired, Please re-send OTP !'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 1
            response['exception_status'] = 0

        else:        # OTP VERIFICATION SUCCESSFULL

            # Fetch token and send, for security purpose
            userQuerySet = Account.objects.get(email=email)
            token = Token.objects.get(user_id=userQuerySet.id)

            # -- Delete Entries from OTP table -- #
            otpQuerySet.delete()
            # ----------------------------------- #

            response['data'] = {'token':token.key}
            response['message'] = 'OTP Verification Successfull !'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 0
            response['exception_status'] = 0

    except Exception as e:
        response['data'] = ''
        response['message'] = str(e)
        response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
        response['error_status'] = 0
        response['exception_status'] = 1
    return Response(response)

# --- API TO CHANGE PASSWORD --- #
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        response = {}
        newPassword = request.data.get('password')
        if newPassword is None:
            response['data'] = ''
            response['message'] = 'Please provide password as parameter'
            response['status'] = status.HTTP_200_OK
            response['error_status'] = 1
            response['exception_status'] = 0
            return Response(response)

        userQuerySet = Account.objects.get(id=request.user.id)
        userQuerySet.set_password(newPassword)
        userQuerySet.save()

        response['data'] = ''
        response['message'] = 'Password Changed Successfully !'
        response['status'] = status.HTTP_200_OK
        response['error_status'] = 0
        response['exception_status'] = 0

    except Exception as e:
        response['data'] = ''
        response['message'] = str(e)
        response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
        response['error_status'] = 0
        response['exception_status'] = 1
    return Response(response)