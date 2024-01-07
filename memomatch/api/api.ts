const catApiKey = process.env.CAT_API_KEY;
const dogApiKey = process.env.DOG_API_KEY;

export function getCatPics(): string[] {
  let images: string[] = [];

  try {
    fetch(
      "https://api.thecatapi.com/v1/images/search?&limit=8&order=RAND&api_key=" +
        catApiKey
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((element: { url: string }) => {
          images.push(element.url);
        });
      });
  } catch (error) {
    console.log(error);
  }
  return images;
}

export async function getDogPics() {
  let images: string[] = [];

  try {
    const res = await fetch(
      "https://api.thedogapi.com/v1/images/search?&limit=8&order=RAND&api_key=" +
        dogApiKey
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((element: { url: string }) => {
          images.push(element.url);
        });
      });
  } catch (error) {
    console.log(error);
  }
  return images;
}
