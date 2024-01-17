const txt = `French Angelfish Adult
Class: Pomacanthidae

French Angelfish Juvenile

Class: Pomacanthidae

Queen Angelfish
Class: Pomacanthidae

Banded Butterflyfish
Class: Chaetodontidae

Foureye Butterflyfish
Class: Chaetodontidae

Blue Tang Adult
Class: Acanthuridae

Ocean Surgeonfish
Class: Acanthuridae

Queen Parrotfish Adult
Class: Scaridae

Queen Parrotfish Initial
Class: Scaridae

Striped Parrotfish Terminal
Class: Scaridae

Striped Parrotfish Initial
Class: Scaridae

Stoplight Parrotfish Terminal
Class: Scaridae

Stoplight Parrotfish Initial
Class: Scaridae

Princess Parrotfish Terminal
Class: Scaridae

Princess Parrotfish Initial
Class: Scaridae

Tiger Grouper
Class: Serranidae

Graysby
Class: Serranidae

Redband Parrotfish Terminal
Class: Scaridae

Redband Parrotfish Initial
Class: Scaridae

Coney
Class: Serranidae

French Grunt
Class: Haemuliae

Smallmouth Grunt
Class: Haemuliae

Bluestriped Grunt
Class: Haemuliae

Caesar Grunt
Class: Haemuliae

Black Margate
Class: Haemuliae

Gray Snapper
Class: Lutjanidae

Schoolmaster Snapper
Class: Lutjanidae

Yellowtail Snapper
Class: Lutjanidae

Mahogany Snapper
Class: Lutjanidae

Cubera Snapper
Class: Lutjanidae

Queen Triggerfish
Class: Balastidae

Black Durgon
Class: Balastidae

Orangespotted Filefish
Class: Balastidae

Whitespotted Filefish
Class: Balastidae

Yellowtail Damselfish

Great Barracuda

Spanish Hogfish

Hogfish (juvenile)

Hogfish (adult)

Bar Jack

Rock Beauty Class: Pomacanthidae

Gray Angelfish

Class: Pomancanthidae


Spotfin Butterflyfish

Class: Chaetodontidae


Reef Butterflyfish

Class: Chaetodontidae


Longsnout Butterflyfish

Class: Chaetodontidae


Doctorfish

Class: Acanthuridae


Blue Parrotfish

Class: Scaridae


Midnight Parrotfish

Class: Scaridae


Rainbow Parrotfish

Class: Scaridae


Redtail Parrotfish

Class: Scaridae


Redfin Parrotfish

Class: Scaridae


Black Grouper

Class: Serranidae


Red Hind

Class: Serranidae


Rock Hind

Class: Serranidae


Spanish Grunt

Class: Haemuliae


Sailors Choice

Class: Haemuliae


Mutton Snapper

Class: Lutjanidae


Dog Snapper

Class: Lutjanidae


Ocean Triggerfish

Class: Balastidae


Scrawled Filefish

Class: Balastidae


Blue Tang Juvenile

Class: Acanthuridae`;

const lines = txt.split("\n");

console.log(lines.slice(0, 10));

const allFish = [];
let fishName = "";
let className = "";

lines.forEach((line) => {
  if (line.startsWith("Class")) {
    className = line.split(": ")[1];
    allFish.push({ fishName, className });
    fishName = "";
    className = "";
  } else if (line === "") {
    // do nothing?
  } else {
    if (fishName) {
      allFish.push({ fishName });
    }
    fishName = line;
  }
});

console.log(allFish);

const classFishMap = {
  noClass: [],
};

allFish.forEach((fish) => {
  const { fishName, className } = fish;
  if (className) {
    if (!classFishMap[className]) classFishMap[className] = [];
    classFishMap[className].push(fishName);
  } else {
    classFishMap["noClass"].push(fishName);
  }
});

console.log(classFishMap);

// NOTE: issue with 'Rock Beauty Class: Pomacanthidae' line
// NOTE: issue with Pomancanthidae double spelling

// Only missing classes for 7 fish
// And we have 8 classes -- cool! Freakin love to see it

// Should account for juvenile/terminal distinction maybe?
// Also maybe male/female...?

/**
 * Stuff we're missing...
 *
 *
 * - Eels
 * - Rays: Guitarfish, lesser electric, southern stingray, yellow stingray, spotted eagle, manta, (atlantic torpedo)
 *
 *  * - Tarpon & Needlefish
 * - Sand diver
 *  * - Hamlets, Bass, Basslets (Fairy!)
 * - Porgys, Breams
 *
 * - Arrow crab
 * - Big crab, lobster
 * - Anemone, Urchin, Starfish, Sea cucumber, Brittle star,
 *
 *
 *
 *  * - Jacks? Only Bar Jack?
 * - Wrasses
 * - Flounders
 * - Pygmy filefish
 * - Scorpionfish
 * - Goatfish
 * - Pufferfish & Boxfish
 * - Damsels & Sergeants
 * - Surgeons & Unicorns
 * - Lizardfish
 * - Toadfish, Frogfish
 * - Drumfish
 * - Squirrelfish, Trumpetfish
 * - Sea horse, Pipefish
 * - Jawfish, Gobys
 *
 * Holy shit, that's a lot of fish man, hahahah
 *
 * Remember, rays and sharks are a whole other Class, Chondrichthyes, cartilaginous fish.
 *
 *
 */

console.log(Object.keys(classFishMap));

const families = {
  Acanthuridae: "Surgeons, Tangs, Unicorns",
  Aulostomidae: "Trumpetfish",
  Balastidae: "Triggerfish & Filefish",
  Batrachoididae: "Toadfish & Frogfish",
  Belonidae: "Needlefish",
  Bothidae: "Peacock flounder",
  Carangidae: "Jacks",
  Chaetodontidae: "Butterflyfish",
  Diodontidae: "Porcupinefish",
  Gobiidae: "Gobies",
  Haemuliae: "Grunts",
  Holocentridae: "Squirrelfish",
  Howellidae: "Oceanic Basslets",
  Labridae: "Wrasse",
  Lutjanidae: "Snappers",
  Monacanthidae: "Filefish",
  Mullidae: "Goatfish",
  Opistognathidae: "Jawfish",
  Ostraciontidae: "Boxfish",
  Pomacanthidae: "Marine angelfish",
  Pomacentridae: "Damsels & Sergeants",
  Scaridae: "Parrotfish!",
  Sciaenidae: "Drums & Croakers",
  Scorpaenidae: "Scorpionfish, lionfish",
  Serranidae: "Groupers",
  Sparidae: "Sea Breams, Porgies",
  Syngnathidae: "Sea horses & Pipe fishes",
  Synodontidae: "Lizardfish, sand divers",
  Tetraodontidae: "Pufferfish",
  Muraenidae: "Moray eels",
  Congridae: "Conger eels",
  Megalopidae: "Tarpon",
};

// https://en.wikipedia.org/wiki/Tetraodontiformes -- also trunkfish and ocean sunfish, and cowfish
// Tetraodontiformes is another order... alongside... hmm idk. Maybe look up what order each of these families belongs to...

const orders = {
  Tetraodontiformes: [
    "Ostraciontidae",
    "Monacanthidae",
    "Balastidae",
    "Diodontidae",
  ],
  Perciformes: [], // An absolute shitload haha, "perch-like fishes"
  Batrachoidiformes: [], // Toadfish
  Aulopiformes: [], // Lizardfish
  Syngnathiformes: [], // Trumpetfish, sea horses
  Pleuronectiformes: [], // Flatfish
  Anguilliformes: [], // Eels!
  BELONIFORMES: [], // Needlefish
  Elopiformes: [], // Tarpon
};

// Man I would like to map this.
// All in Phylum Chordata (so far).
// Then... two classes? Cartilaginous and ray-finned fish? There's also jawless.... ew haha.

// Superorders: Batoidea (rays and skates), Squalomorphii, Squatinomorphii (angel sharks), Galeomorphii

const cartilaginousOrders = {
  Orectolobiformes: [], // nurse shark
  Carcharhiniformes: [], // black tipped reef shark
  Rhinopristiformes: [], // guitarfish
  Myliobatiformes: [], // rays
};

// This table is super helpful, https://fishbase.mnhn.fr/manual/english/orders.htm
// For any two orders we could find point of time of last common ancestor -- can also know how old they are

// Each of jawless, cartilaginous, and bony could have an array of Orders under it.

const allFish = [
  {
    name: "jawless",
    children: [],
  },
  {
    name: "cartilaginous",
    children: [
      { name: "Myliobatiformes", children: [] },
      { name: "Rhinopristiformes", children: [] },
      { name: "Orectolobiformes", children: [] },
      { name: "Carcharhiniformes", children: [] },
    ],
  },
  {
    name: "bony",
    children: [
      {
        name: "Tetraodontiformes",
        description: "Defense at the expense of speed",
        children: [
          {
            name: "Ostraciontidae",
            description: "Boxfishes",
            children: [],
          },
          {
            name: "Monacanthidae",
            description: "Filefishes",
            children: [],
          },
          {
            name: "Balastidae",
            description: "Triggerfishes",
            children: [],
          },
          {
            name: "Diodontidae",
            description: "Porcupinefishes",
            children: [],
          },
          {
            name: "Molidae",
            description: "Pufferfishes",
            children: [],
          },
          {
            name: "Tetraodontidae",
            description: "Ocean sunfishes",
            children: [],
          },
        ],
      },
      { name: "Perciformes", children: [] },
      { name: "Batrachoidiformes", children: [] },
      { name: "Aulopiformes", children: [] },
      { name: "Syngnathiformes", children: [] },
      { name: "Pleuronectiformes", children: [] },
      { name: "Anguilliformes", children: [] },
      { name: "Beloniformes", children: [] },
      { name: "Elopiformes", children: [] },
    ],
  },
];

// I guess we need to start with a long list of individual species we care about. Will likely be like 100.
// And then.... we work up from each one, finding its family, then order.
// Still some consideration for age and sex.... likely just a new entry, like the flash cards did.

// You know.... may be worth trying to scrape wikipedia for this.
// Has all the family, order info, Even genus.
// Also has a picture which is super nice.

const allTheFishSpecies = `



`;

// Omfg you can make them look like little tradeable cards, .... like in Dave the Diver!!!
