import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

try:
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Test HTML Email'
    msg['From'] = 'techbyabdullah9@gmail.com'
    msg['To'] = 'techbyabdullah9@gmail.com'
    
    html = '''
    <html>
      <body>
        <p>Hi,<br>
           How are you?<br>
           Here is the <a href="http://www.python.org">link</a> you wanted.
        </p>
      </body>
    </html>
    '''
    
    part2 = MIMEText(html, 'html')
    msg.attach(part2)
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('techbyabdullah9@gmail.com', 'ldsiqmgjuzdylyuw')
    server.send_message(msg)
    server.quit()
    print('HTML Email sent successfully!')
except Exception as e:
    print('Error sending HTML email:', str(e))
