FROM Java:8

#ENV timezone
#RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \&& echo 'Asia/Shanghai' >/etc/timezone

# WORKDIR
#WORKDIR /apps

#Copy command, copy files or directories from the context directory to the specified path in the container
COPY huiban-0.0.1-SNAPSHOT.jar /app/huiban.jar

#EXPOSE 18081
ENTRYPOINT ["java", "-jar", "huiban.jar", "--logging.file.path=/apps"]


#"-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005",\