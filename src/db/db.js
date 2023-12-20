import { readFile, writeFile } from "fs/promises";

export async function load(name) {
  try {
    const data = await readFile(`./saves/${name}.json`, "utf-8");
    return data;
  } catch (err) {
    console.warn(err);
  }
}

export async function save(name, json) {
  try {
    // Read the existing file
    const data = await readFile(`./saves/${name}.json`, "utf-8");
    var jsonData = JSON.parse(data);

    // Append the new data
    const newJsonData = JSON.parse(json);
    if (Array.isArray(jsonData)) {
      jsonData.push(newJsonData);
    } else {
      jsonData = [jsonData, newJsonData];
    }

    // Write the updated data back to the file
    await writeFile(`./saves/${name}.json`, JSON.stringify(jsonData));
  } catch (err) {
    console.warn(err);
  }
}