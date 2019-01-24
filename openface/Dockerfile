FROM bamos/openface

ADD /server/install-deps /server/install-deps
WORKDIR /server
RUN bash install-deps

ADD /server /server

CMD ["/bin/bash", "run.sh"]
