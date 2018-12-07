FROM continuumio/miniconda3

# files
ADD /files/environment.yml /files/environment.yml
WORKDIR /files

# anaconda
RUN conda env create

# torch
WORKDIR /tmp
RUN git clone https://github.com/torch/distro.git ~/torch --recursive
WORKDIR /root/torch
RUN apt-get update
RUN apt-get install sudo
RUN bash install-deps
RUN ./install.sh

## openface
RUN for NAME in dpnn nn optim optnet csvigo cutorch cunn fblualib torchx tds; do /root/torch/install/bin/luarocks install $NAME; done
RUN git clone https://github.com/cmusatyalab/openface.git /root/openface

ADD /files/install-openface.sh /files/install-openface.sh
RUN /files/install-openface.sh

RUN echo 'export PATH=$PATH:/root/torch/install/bin' >> ~/.bashrc