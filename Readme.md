# Which deputy are you?

This is a simple application that allows you to find out which deputies of Polish parliament are most similar to you. 

## Usage

To use our application just go to this [link](https://github.com/GreenShade/similar-faces). THe following page will appear:
![](https://lh3.googleusercontent.com/GxPmJXVw-DhOLwAiNCs19YQFgJ422zzk5-6jxaGLFeiZ7jooVTutXtXUIj9-2xJbSxZIgq2Yt1u-m0eWyyuvCK9UsxphR0mED4zTWXN5Z96K6IgaSCKuDtaK6xhX2zusgLrZOk_48FH8p3S3Uhjp-Z_a4PX4CqpFD8Uef_WrvJG3wbKIZU08BYSOWjyzl8zN2Enmq85Imf3Khu1K91CJTjyU0cZ_TylI-M-4j31SHnivujcMsRClkGswuYRHZJ71zzopBjynTQnQYQY-RwOqWm1MNW_pYB8m-Cc1Ms0bNj9R6SyhnMh6WgEQ7T7iEz7BuKGwZ4hp4aQVHVdwQg_wjNJ0v1udQ4lyOCDBpSQr1kIrZRnRNYYj4nNG2wtQhV-8PTpc4wK6GKQuy_NARtocT6QO3IDhAyG-M5uXzamI6h2UBWshqJnwpHhJf_2Dg_p_QqY5dWde8XupHnUPruMrycQjGw1aJsT-abYcocq0_nRKwIJO3S6k0vTmGTJCfAO7TEjBLx_RN2UpEavnuDdbu8e-QiiKdz7UiaLvurMJNwpl9yuvqGLKDKieaMGmRlUJVdatvV3Qlpwqh-e_2Do09JWwzmVWL9p11qBhXts5f-KJ3ghSh2iJFtiFuV3qh3ht1xL54TeDIR6daGr3IFuOCFtZR-8VV8zV2kWJWcoPb_4hobxjAr3ikkTPURTf6Gs-jPiIcp3kH2d5GoySlLU=w876-h797-no)
At the top you can see the image captured in real time from your built-in camera. To use it you may have to accept permissions in your browser to use camera.
When your face will be detected in captured images, the app will show you three the most similar deputies of Polish parliament to you. During capturing the algorithm is learning your face so to get better results try to move your head around to capture it from different angles.
If the detection algorithm lososes your face for 2 seconds the learned face will be reset and new face will be learned. 

Example: 
![](https://lh3.googleusercontent.com/8msQTVIhL3NSXCm0ZL-MeY83pt3une0Y341mewvVcSyIpP2rrQciZ2qqSRqMf94YtMTY6GLXJqEC6Z2KG0Jja2r9IyR06Zmm13xOqNk-x8s88DvMuBwMbZR-as-jLxUXu_POTO9NM_aP2Gt0xu0j77LnuPzcxu0wl24KRXLB522U6gYZnwBcwbB_QJnlay8_maPebS9gTVlCY3jvO7yE3PEJhOhAi-Saye500Hc0JUqNjt5NWuorBJHGx4q-5o43MRT3Rb4yiKtYUUYhH7PFeLkAb7O_8lakcg0i11_6UNN_aBq7_-U54WF01wP_YSD-f8zp8o6a333-QoiC7KHqLEZ2RX9udpNv1nQUomsK2HSkv1h7GlLlIDo8xyYVsKuwKILZN2JdQrUF28_438hmX9_fqo0vEYdprO0P96res-ECVTFHRIGoYzrlw4YjPFuY5hWyB81_HSK7yc_QwvCu0kcvUmO_q6xKFcyf1CGTcPKc-quys32iJ688zTBXMaxEEETyQvJoEa21QrMJIutIegfXKOsYto1e-3SwgFjig1_LqamwFTzq-lDoqWpztOh80mEmhP0KuUF9MJ8QWtWPNVfcCEIOZQEoMVi-WOTbDawG40ZIVo_U3K9TjEWxCaR15AjNEaKISiZ_w9Ya_jcH8-avwg=w937-h797-no)
You can see 3 different people with their names. The bounding box on the image is shown when your face is detected.

## Running
run `docker-compose up` from `docker` directory

## TODO
1. application requires running crawler and `postgres.py` before it can be used; this should be automated
2. image is a little too flickery at the moment of writing, should fix that too
3. UI has fixed margins >.<