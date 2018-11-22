from bs4 import BeautifulSoup
import urllib.request

uri = "http://www.sejm.gov.pl/sejm8.nsf/poslowie.xsp"


def get_image(uri):
    with urllib.request.urlopen(uri) as response:
        soup = BeautifulSoup(response.read(), "html.parser")
        partia = soup.find_all("div", {"class": "partia"})[0]
        return partia.find("img")["src"]


with urllib.request.urlopen(uri) as response:
    soup = BeautifulSoup(response.read(), "html.parser")
    deputy_group = soup.find_all("ul", {"class": "deputies"})

    for deputies in deputy_group:
        for deputy in deputies.find_all("li"):
            name = '_'.join(deputy.find_all("div", {"class": "deputyName"})[0].text.split()).lower() + ".jpg"
            face_uri = "http://www.sejm.gov.pl/" + deputy.find_all("a")[0]["href"]

            with urllib.request.urlopen(get_image(face_uri)) as image_response:
                with open("server/people/" + name, "wb") as f:
                    f.write(image_response.read())
