const { data } = require("./scrapedData");

console.log(Object.keys(data).length);

const all = {
  order: new Set(),
  family: new Set(),
  genus: new Set(),
  species: new Set(),
};

Object.values(data).forEach((fishData) => {
  // const {phylum,class,order,family,genus,species,commonName} = fishData;
  ["order", "family", "genus", "species"].forEach((cat) => {
    if (!fishData) return;

    all[cat].add(fishData[cat]);
  });
});

console.log(all);

console.log(
  "Num undefined:",
  Object.values(data).filter((x) => x === undefined || x?.order === undefined)
    .length
);

// Nice -- 23 orders, 38 families, 53 geni, 65 species -- really only 63 once exclude "" and undefined. Same for each category.
// 21 failures... but we had like 90 to start... Hmm maybe duplicates?

// Next: print out how many children each order & family has.

const orderedOrders = [...all.order]
  .map((name) => {
    return {
      name,
      value: Object.values(data).filter((x) => x?.order === name).length,
    };
  })
  .sort((a, b) => a.value - b.value);

console.log("Orders:", orderedOrders);

console.log(" ================ ");

const orderedFamilies = [...all.family]
  .map((name) => {
    return {
      name,
      value: Object.values(data).filter((x) => x?.family === name).length,
    };
  })
  .sort((a, b) => a.value - b.value);

console.log("Families:", orderedFamilies);

// Ok great... next.... print out the actual fish that live under each family.

// Oh, actual next,, ... just go ahead and render it all out in a table. Nested sort baby!
// Sort by order, then family, then genus (if you want)... then species! Hell yeah!
// That will also show the undefined ones easily
// Can color the differnt orders, not quite sure how...

// TODO: Ooooh we really need to fix the trailing lines.... that's messing stuff up for sure. Shows up in multiple categories.
// -- first time you see capital letter after first letter, delete everything after and including that.
// Honestly it may not matter. But it's better to clean up.
