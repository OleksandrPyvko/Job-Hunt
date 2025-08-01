function longestCommonPrefix(strs) {
  const result = "";

  const splitted = strs.map((str) => str.split(""));
  console.log(splitted);

  const minLength = Math.min(...splitted.map(word => word.length))
  

  
}

longestCommonPrefix(["flower", "flow", "flight"]);
