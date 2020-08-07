@echo off set /p input= echo %input%>pw.txt
scp -r dist/zeitzeugen/* root@33798.hostserv.eu:/var/www/zeitzeugen.art/html/