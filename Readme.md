# Which deputy are you?

This is a simple application that allows you to find out which deputies of Polish parliament are most similar to you. 

## Usage

To use our application just go to this [link](http://13.95.133.4:3000). You can also use it locally using docker and docker-compose. Run `docker-compose up` from `docker` directory. After starting the following page will appear:
![](https://lh3.googleusercontent.com/GxPmJXVw-DhOLwAiNCs19YQFgJ422zzk5-6jxaGLFeiZ7jooVTutXtXUIj9-2xJbSxZIgq2Yt1u-m0eWyyuvCK9UsxphR0mED4zTWXN5Z96K6IgaSCKuDtaK6xhX2zusgLrZOk_48FH8p3S3Uhjp-Z_a4PX4CqpFD8Uef_WrvJG3wbKIZU08BYSOWjyzl8zN2Enmq85Imf3Khu1K91CJTjyU0cZ_TylI-M-4j31SHnivujcMsRClkGswuYRHZJ71zzopBjynTQnQYQY-RwOqWm1MNW_pYB8m-Cc1Ms0bNj9R6SyhnMh6WgEQ7T7iEz7BuKGwZ4hp4aQVHVdwQg_wjNJ0v1udQ4lyOCDBpSQr1kIrZRnRNYYj4nNG2wtQhV-8PTpc4wK6GKQuy_NARtocT6QO3IDhAyG-M5uXzamI6h2UBWshqJnwpHhJf_2Dg_p_QqY5dWde8XupHnUPruMrycQjGw1aJsT-abYcocq0_nRKwIJO3S6k0vTmGTJCfAO7TEjBLx_RN2UpEavnuDdbu8e-QiiKdz7UiaLvurMJNwpl9yuvqGLKDKieaMGmRlUJVdatvV3Qlpwqh-e_2Do09JWwzmVWL9p11qBhXts5f-KJ3ghSh2iJFtiFuV3qh3ht1xL54TeDIR6daGr3IFuOCFtZR-8VV8zV2kWJWcoPb_4hobxjAr3ikkTPURTf6Gs-jPiIcp3kH2d5GoySlLU=w876-h797-no)
At the top you can see the image captured in real time from your built-in camera. To use it you may have to accept permissions in your browser to use camera.
When your face will be detected in captured images, the app will show you three the most similar deputies of Polish parliament to you. During capturing the algorithm is learning your face so to get better results try to move your head around to capture it from different angles.
If the detection algorithm lososes your face for 2 seconds the learned face will be reset and new face will be learned. 

Example:
![](https://lh3.googleusercontent.com/q5aFsoIxcLtLYYADVGo2DbDbbdpmIXYZ4TGwC0WPQwhDBjQSzrx4UyUv7AtWii49ggKIs2vp3VEBodnCcrUS98GXGDkhGKo4SfFhh8EspYPx30Uer1uiTyvUCB7j42quweqXV_EXJ0Fdk1dWPL4hlYmyF9my-9nO6ZSASFOMXoVN6Mfv41EnyxB75B1WMf9B8loUC8sBHOMz9CipFsDKK3WKU8CnguR6D1YYOvuJjjLQQhYnzhlhdMTh2VQl1Qg64hbjdLriWvEw-Gah_sAZTTS28JHDUADLNsg9JL0kl2Z0HEhJul6kUVdo47SYFiE495p9VxU1UUnagmdqvWaUN5UxQsKLh6kKYc2OXPevus34NLThZCcJci0unVajGCNDihAir-xDg6a8tWVp1UwH2RQDvRcqui-ibPKsG0ERUg-mA7fdJSz0fb_MUH7YLRa5610BsE2cyibq0k4U5giuXE84NBUEXnllYXuSaDigrRcYwn5_9OOyJdy3iSEVgpxBZq645-DOmX126HAV8LpHrQYo62YJoDLgmNICtdcKxhAhX262mBov6huo53zBoXolc_yeYwI700dL9wo5OVHDnCPicloOunuoTdFI3TFX5LUZTiBv5vJ1QPqj7tm5ZLL3-QvPEqXc8dOfcZqGXnWhAhYOKdMybYnHNR73zXbuG_GqawPZsausenRSBlkb0a-iGCJ8jmXYuwJq2nRPbEs=w648-h551-no)

You can see 3 different people with their names. The bounding box on the image is shown when your face is detected.

## Architecture

The architecture consists of backend written in Python and frontend written in Javascript. It looks as follows:
![] ( )


### UI
The web app uses Node.js and React as front-end framework. The front-end webpage uses your built-in camera to capture frames and localize your face on the image wich is sent to Flask back-end API. The back-end responses with locallized face, images of 3 the most similar deputies and the data to plot two first principal components of the embedding space, so you can see the position of your face in the 128-dimensional space of other faces. This plot is created using D3 framework.

### Server

Server uses python and Flask framework to create API which comunicates woth fron-end. It also uses OpenFace package to detect face and find the most similar face. Every image is embedded in 128-dimensional space and then the three nearest neighbours are found with euclidean distance. To find the embedding of face OpenFace uses pre-trainded Deep neural network model [nn4.v1](https://storage.cmusatyalab.org/openface-models/nn4.v1.t7). When face is continously detected it is averaged, because predictions for single frame are really unstable. After 2 seconds with no face detected the embedding of face is reset and averaging starts from scrach. 


## Running
run `docker-compose up` from `docker` directory
