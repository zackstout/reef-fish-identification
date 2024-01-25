const cheerio = require("cheerio");
const axios = require("axios");

let errors = 0;

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
    errors++;
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

  //   "Green sea turtle",
  //   "Hawksbill sea turtle",
  //   "Bluehead",
  //   "Yellowhead wrasse",
  //   "Clown wrasse",
  //   "Rainbow wrasse",
  //   "Yellowcheek wrasse",
  //   "Greenband wrasse",
  //   "Painted wrasse",
  //   "Midnight parrotfish",
  //   "Blue parrotfish",
  //   "Rainbow parrotfish",
  //   "Redtail parrotfish",
  //   "Yellowhead jawfish",
  //   "Banded jawfish",
  //   "Great barracuda",
  //   "Palehead blenny",
  //   "Blue gobi",
  //   "Yellowtail damselfish",
  //   "Surgeonfish",
  //   "Blue chromis",
  //   "Rock beauty",
  //   "Blue angelfish",
  //   "Reef butterflyfish",
  //   "Threeband butterflyfish",
  //   "Spotted drum",
  //   "White grunt",
  //   "Sheepshead",
  //   "Mutton snapper",
  //   "Yellowtail snapper",
  //   "Bar Jack",
  //   "Palometa",
  //   "Bigeye scad",
  //   "Glasseye snapper",
  //   "Pale cardinalfish",
  //   "Fairy basslet",
  //   "Blackcap basslet",
  //   "Mutton hamlet",
  //   "Black grouper",
  //   "Reef bass",
  //   "Sand perch",
  //   "Nassau grouper",
  //   "Lined seahorse",
  //   "Spotted scorpionfish",
  //   "Reef scorpionfish",
  //   "Lionfish",
  //   "Reef squirrelfish",
  //   "Coral toadfish",
  //   "Dwarf frogfish",
  //   "Tarpon",
  //   "Green moray eel",
  //   "Spotted moray eel",
  //   "Purplemouth moral eel",
  //   "Goldentail moral eey",
  //   "Spotted eagle ray",
  //   "Southern stingray",
  //   "Yellow stingray",
  //   "Lesser electric ray",
  //   "Guitarfish",
  //   "Manta ray",
  //   "Nurse shark",
  //   "Whitespotted puffer",
  //   "Spotted trunkfish",
  //   "Yellow boxfish",
  //   "Whitespotted pygmy filefish",
  //   "Broom filefish",
  //   "Peacock flounder",
  //   "Black durgon",

  //   "Royal grammma", // Fairy basslet
  //   "Cephalopholis fulva", // Coney
  //   "Paracanthurus hepatus", // Blue tang
  //   "Halichoeres maculipinna", // clown wrasse
  //   "Archosargus probatocephalus", // sheepshead
  //   "Haemulon chrysargyreum", // small mouth grunt
  //   "Cantherhines macrocerus", // white spotted filefish
  //   "Slippery dick",
  //   "Three-banded butterflyfish",
  //   "Purplemouth moray eel",
  //   "Gymnothorax miliaris", // goldentail moray
  //   "White-spotted puffer",
  //   "Porcupinefish",
  //   "Whitetip reef shark",
  //   "Sergeant major (fish)",
  //   "Stenorhynchus seticornis", // arrow crab
  //   "Maguimithrax spinosissimus", // caribbean king crab
  //   "Mithraculus cinctimanus", // some crab
  //   "Panulirus argus", // caribbean spiny lobster
  //   "Caribbean reef squid",
  //   "Caribbean reef octopus",
  //   "Comb jellyfish",

  //   "Loggerhead sea turtle",
  //   "Aluterus schoepfii", // orange filefish
  //   "Monacanthus ciliatus", // fringed filefish
  //   "Stegastes leucostictus", // beaugregory (damselfish)
  //   "Stegastes partitus", // bicolor damselfish
  //   "Butter hamlet",
  //   "Shy hamlet",
  //   "Indigo hamlet",
  //   "Sunshinefish",
  //   "Brown chromis",
  //   "Longsnout butterflyfish",
  //   "Spotfin butterflyfish",
  //   "Red hind",
  //   "Harlequin bass",
  //   "Tobaccofish",
  //   "Cave basslet",
  //   "Acanthurus bahianus", // ocean surgeonfish
  //   "Green razorfish",
  //   "Pearly razorfish",
  //   "Porkfish",
  //   "Dog snapper",
  //   "Cubera snapper",
  //   "Mahogany snapper",
  //   "Blackfin snapper",
  //   "Green humphead parrotfish",
  //   "Ocean triggerfish",
  //   "Sargassum triggerfish",
  //   "Smooth trunkfish",
  //   "Honeycomb trunkfish",
  //   "Scrawled filefish",
  //   "Longspine squirrelfish",
  //   "Reef squirrelfish",
  //   "Yellowhead jawfish",
  //   "Balloonfish",
  //   "Jack-knifefish",
  //   "Pareques acuminatus", // high hat fish, like drums
  //   "Trumpetfish",
  //   "Spotted goatfish",
  //   "Yellow goatfish",
  //   "Bermuda chub",
  //   "Darkfin chub",
  //   "Bearded toadfish",
  //   "Red lionfish",
  //   "Channel flounder",
  //   "Eyed flounder",
  //   "Maculated flounder",
  //   "Viper moray eel",
  //   "Brown garden eel",
  //   "Caribbean blenny",
  //   "Flamingo tongue snail",
  //   "Sand diver",
  //   "Red lizardfish",
  //   "Sheepshead porgy",
  //   "Jothead porgy",
  //   "Caribbean whiptail stingray",

  "Spotted spiny lobster",
  "Queen conch",
  "Bearded fireworm",
  "Christmas tree worm",
  "Magnificent feather duster",
  "Brown fanworm",
  "Moon jelly",
  "Comb jelly",
  "Thimble jelly",
  "Holothuria mexicana", // donkey dung sea cucumber LOL
  "Channel clinging crab",
  "Nimble spray crab",
  "Hairy clinging crab",
  "Shortfinger neck crab",
  "Neck crab",
  "Reticulated brittle star",
  "Giant hermit crab",
  "Red reef hermit crab",
  "Banded coral shrimp",
  "Spotted cleaner shrimp",
  "Dark mantis shrimp",
  "Giant basket star",

  // NOTE: many wrasses lack individual wikis, https://en.wikipedia.org/wiki/Halichoeres (genus)
  // Same for gobys, https://en.wikipedia.org/wiki/Elacatinus (genus)
  // Ditto for parrots, https://en.wikipedia.org/wiki/Scarus (genus)
  // See scorpionfish here, https://en.wikipedia.org/wiki/Scorpaeninae (family)
  // Slender filefish missing from wiki
  // Yellowtail damselfish picture sucks (maybe a juvenile or gender thing?)
  // NOTE that angelfishes have QUITE different juvenile forms
];

const run = async () => {
  let total = 0;
  const result = {};
  let idx = 0;
  const itv = setInterval(async () => {
    const fishName = fishList[idx];

    const fishData = await parseFishData(fishName);
    result[fishName] = fishData;
    console.log(`Processed ${fishName}.`);
    total++;
    idx++;

    if (idx === fishList.length) {
      clearInterval(itv);
      console.log(
        "All done!",
        result,
        `${total - errors} / ${total} successful!`
      );
    }
  }, 1000);
  //   const cowfish = await parseFishData("Scrawled cowfish");

  //   console.log(cowfish);
};

run();

// Wow it actually works
