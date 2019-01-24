FROM rafaello08/wb_env

# files
ADD /server /server
WORKDIR /server

RUN bash install-deps

# run
CMD ["/bin/bash", "run.sh"]
