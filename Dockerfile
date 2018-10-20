FROM docker_env

# files
ADD /server /server
WORKDIR /server

# run
CMD ["/bin/bash", "run.sh"]