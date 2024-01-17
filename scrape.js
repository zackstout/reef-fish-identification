const cheerio = require("cheerio");
const axios = require("axios");

const parseFishData = async (fishName) => {
  const cleanName = fishName.split(" ").join("_");

  //   console.log("resp", fishName, cleanName);

  try {
    const response = await axios.get(
      `https://en.wikipedia.org/wiki/${cleanName}`
    );

    const $ = cheerio.load(response.data);

    const realResult = {
      commonName: fishName,
    };

    const result = [];

    $(".biota td").each((i, el) => {
      // Wow, look at that, that's it
      const text = $(el).text().trim();
      // console.log(text);
      result.push(text);
    });

    ["Phylum", "Class", "Order", "Family", "Genus", "Species"].forEach(
      (cat) => {
        const idx = result.findIndex((c) => c.startsWith(cat));
        realResult[cat.toLowerCase()] = result[idx + 1];
      }
    );

    realResult.imageSrc = $(".biota img").attr("src");

    return realResult;
  } catch (e) {
    console.log("Whoops!", fishName);
  }
};

const fishList = [
  //   "Scrawled cowfish",
  //   "French angelfish",
  //   "Queen angelfish",
  //   "Queen triggerfish",
  //   "Banded butterflyfish",
  //   "Foureye butterflyfish",

  //   "Gray angelfish",
  //   "Blue tang",
  //   "Ocean surgeonfish",
  //   "Queen parrotfish",
  //   "Striped parrotfish",
  //   "Stoplight parrotfish",
  //   "Princess parrotfish",
  //   "Tiger grouper",
  //   "Coney",
  //   "French grunt",
  //   "Smallmouth grunt",
  //   "Bluestriped grunt",
  //   "Black margate",
  //   "Schoolmaster snapper",
  //   "Yellowtail snapper",
  //   "Black durgon",
  //   "Whitespotted filefish",
  //   "Hogfish",
  //   "Spanish hogfish",

  "Green sea turtle",
  "Hawksbill sea turtle",
  "Bluehead",
  "Yellowhead wrasse",
  "Clown wrasse",
  "Rainbow wrasse",
  "Yellowcheek wrasse",
  "Greenband wrasse",
  "Painted wrasse",
  "Midnight parrotfish",
  "Blue parrotfish",
  "Rainbow parrotfish",
  "Redtail parrotfish",
  "Yellowhead jawfish",
  "Banded jawfish",
  "Great barracuda",
  "Palehead blenny",
  "Blue gobi",
  "Yellowtail damselfish",
  "Surgeonfish",
  "Blue chromis",
  "Rock beauty",
  "Blue angelfish",
  "Reef butterflyfish",
  "Threeband butterflyfish",
  "Spotted drum",
  "White grunt",
  "Sheepshead",
  "Mutton snapper",
  "Yellowtail snapper",
  "Bar Jack",
  "Palometa",
  "Bigeye scad",
  "Glasseye snapper",
  "Pale cardinalfish",
  "Fairy basslet",
  "Blackcap basslet",
  "Mutton hamlet",
  "Black grouper",
  "Reef bass",
  "Sand perch",
  "Nassau grouper",
  "Lined seahorse",
  "Spotted scorpionfish",
  "Reef scorpionfish",
  "Lionfish",
  "Reef squirrelfish",
  "Coral toadfish",
  "Dwarf frogfish",
  "Tarpon",
  "Green moray eel",
  "Spotted moray eel",
  "Purplemouth moral eel",
  "Goldentail moral eey",
  "Spotted eagle ray",
  "Southern stingray",
  "Yellow stingray",
  "Lesser electric ray",
  "Guitarfish",
  "Manta ray",
  "Nurse shark",
  "Whitespotted puffer",
  "Spotted trunkfish",
  "Yellow boxfish",
  "Whitespotted pygmy filefish",
  "Broom filefish",
  "Peacock flounder",
  "Black durgon",
];

const run = async () => {
  const result = {};
  let idx = 0;
  const itv = setInterval(async () => {
    const fishName = fishList[idx];

    const fishData = await parseFishData(fishName);
    result[fishName] = fishData;
    console.log(`Processed ${fishName}.`);
    idx++;

    if (idx === fishList.length) {
      clearInterval(itv);
      console.log("All done!", result);
    }
  }, 1000);
  //   const cowfish = await parseFishData("Scrawled cowfish");

  //   console.log(cowfish);
};

run();

// Wow it actually works
