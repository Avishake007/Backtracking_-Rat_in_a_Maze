export function pathfinder(arr, sol, i, j, x, y, row, col, str, strpath) {
  var index;
  index = col * i + j;
  if (
    i >= row ||
    j >= col ||
    i < 0 ||
    j < 0 ||
    sol[i][j] === 1 ||
    arr[i][j] === -1
  ) {
    return false;
  }
  if (i === x && j === y) {
    sol[i][j] = 1;
    strpath.key = str;
    // console.log(str+" ii");
    document.getElementsByClassName("cols")[parseInt(index)].style.background =
      "#0A6C61";

    return true;
  }

  sol[i][j] = 1;
  index = col * i + j;
  document.getElementsByClassName("cols")[parseInt(index)].style.background =
    "#0A6C61";
  var a = setTimeout(
    pathfinder,
    1000,
    arr,
    sol,
    i + 1,
    j,
    x,
    y,
    row,
    col,
    str.concat("D"),
    strpath
  );
  var b = setTimeout(
    pathfinder,
    1000,
    arr,
    sol,
    i,
    j + 1,
    x,
    y,
    row,
    col,
    str.concat("R"),
    strpath
  );
  var c = setTimeout(
    pathfinder,
    1000,
    arr,
    sol,
    i - 1,
    j,
    x,
    y,
    row,
    col,
    str.concat("U"),
    strpath
  );
  var d = setTimeout(
    pathfinder,
    1000,
    arr,
    sol,
    i,
    j - 1,
    x,
    y,
    row,
    col,
    str.concat("L"),
    strpath
  );
  if (a || b || c || d) return true;
  sol[i][j] = 0;
  index = col * i + j;
  document.getElementsByClassName("cols")[parseInt(index)].style.background =
    "#7b6a6a";
  return false;
}
export function pathfinder2(arr, sol, i, j, x, y, row, col, str, strpath) {
  // console.log("x : "+x+" y : "+y);
  if (i === x && j === y) {
    sol[i][j] = 1;
    strpath.key = str;
    // console.log(str+" ii");
    return true;
  }
  if (
    i >= row ||
    j >= col ||
    i < 0 ||
    j < 0 ||
    sol[i][j] === 1 ||
    arr[i][j] === -1
  ) {
    return false;
  } else {
    sol[i][j] = 1;
    if (
      pathfinder2(arr, sol, i + 1, j, x, y, row, col, str.concat("D"), strpath)
    )
      return true;
    if (
      pathfinder2(arr, sol, i, j + 1, x, y, row, col, str.concat("R"), strpath)
    )
      return true;
    if (
      pathfinder2(arr, sol, i - 1, j, x, y, row, col, str.concat("U"), strpath)
    )
      return true;
    if (
      pathfinder2(arr, sol, i, j - 1, x, y, row, col, str.concat("L"), strpath)
    )
      return true;
    sol[i][j] = 0;
  }
  return false;
}