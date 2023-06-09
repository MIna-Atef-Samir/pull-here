let productsArray = [];
let newArray = [];

window.onload = () => {
  fetchAll();
};

const clearParent = () => {
  const sortingAndFilteringElement = document.getElementById(
    "sorting-and-filtering"
  );
  const paginationElement = document.getElementById("pagination");
  const parentElement = document.getElementById("productsParent");
  parentElement.innerHTML = "";

  parentElement.append(sortingAndFilteringElement);
  parentElement.append(paginationElement);
};

const fetchAll = () => {
  fetch("http://localhost:5000/api/products/")
    .then((res) => res.json())
    .then((recievedData) => {
      productsArray = recievedData.data;
      renderElements(recievedData.data);
      return recievedData;
    });
};

const renderElements = (products) => {
  let element = document.getElementById("productsParent");
  console.log(`The length of products is ${products.length}`);
  if (products.length === 0) {
    let d1 = document.createElement("p");
    let txtNode = document.createTextNode(
      "No Data Matching Searches and filter"
    );

    d1.append(txtNode);
    d1.style.textAlign = "center";
    element.append(d1);
  } else {
    for (let d of products) {
      let d1 = document.createElement("div");
      d1.classList.add("col-lg-4", "col-md-6", "col-sm-6", "pb-1");
      d1.innerHTML =
        '<div><div class="product-item bg-light mb-4"><div class="product-img position-relative overflow-hidden"><img class="img-fluid w-100" src=' +
        d.image +
        ' alt="' +
        d.name +
        '" /><div class="product-action"><a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a><a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a><a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a><a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a></div></div><div class="text-center py-4"><a class="h6 text-decoration-none text-truncate" href="">' +
        d.name +
        '</a><div class="d-flex align-items-center justify-content-center mt-2"><h5>$' +
        d.price +
        '</h5><h6 class="text-muted ml-2"><del>$' +
        d.price +
        '</del></h6></div><divclass="d-flex align-items-center justify-content-center mb-1"><small class="fa fa-star text-primary mr-1"></small><small class="fa fa-star text-primary mr-1"></small><small class="fa fa-star text-primary mr-1"></small><small class="fa fa-star text-primary mr-1"></small><small class="fa fa-star text-primary mr-1"></small><small>' +
        d.rating_count +
        "</small></divclass=></div></div></div>";
      element.appendChild(d1);
    }
  }
};

const filterPrice = (el) => {
  let checkedPricesArray = checkedPrices(el);

  clearParent();

  let filteredArray = [];
  if (checkedPricesArray.length === 1) {
    filteredArray = productsArray.filter(
      (p) =>
        p.price >= checkedPricesArray[0].min &&
        p.price < checkedPricesArray[0].max
    );
  } else if (checkedPricesArray.length > 1) {
    for (let c of checkedPricesArray) {
      productsArray.filter((p) => {
        if (p.price >= c.min && p.price < c.max) {
          filteredArray.push(p);
        }
      });
    }
  }

  newArray = filteredArray;
  renderElements(newArray);
};

const checkedPrices = (triggerElement) => {
  let pAll = document.getElementById("price-all");
  let p1 = document.getElementById("price-1");
  let p2 = document.getElementById("price-2");
  let p3 = document.getElementById("price-3");
  let p4 = document.getElementById("price-4");
  let p5 = document.getElementById("price-5");

  let checkedPricesArray = [];
  if (pAll.checked && triggerElement.id === "price-all") {
    fetchAll();
    // Uncheck all other color filters
    p1.checked = false;
    p2.checked = false;
    p3.checked = false;
    p4.checked = false;
    p5.checked = false;
    return;
  } else {
    pAll.checked = false;
    if (p1.checked) {
      checkedPricesArray.push({ min: 0, max: 100 });
    }
    if (p2.checked) {
      checkedPricesArray.push({ min: 100, max: 200 });
    }
    if (p3.checked) {
      checkedPricesArray.push({ min: 200, max: 300 });
    }
    if (p4.checked) {
      checkedPricesArray.push({ min: 300, max: 400 });
    }
    if (p5.checked) {
      checkedPricesArray.push({ min: 400, max: 500 });
    }
  }
  return checkedPricesArray;
};

const filterSize = (el) => {
  let checkedSizesArray = checkedSizes(el);

  clearParent();

  let filteredArray = [];
  if (checkedSizesArray.length === 1) {
    filteredArray = productsArray.filter(
      (p) => p.size === checkedSizesArray[0]
    );
  } else if (checkedSizesArray.length > 1) {
    for (let c of checkedSizesArray) {
      productsArray.filter((p) => {
        if (p.size === c) {
          filteredArray.push(p);
        }
      });
    }
  }

  newArray = filteredArray;
  renderElements(newArray);
};

const checkedSizes = (triggerElement) => {
  let sAll = document.getElementById("size-all");
  let s1 = document.getElementById("size-1");
  let s2 = document.getElementById("size-2");
  let s3 = document.getElementById("size-3");
  let s4 = document.getElementById("size-4");
  let s5 = document.getElementById("size-5");

  let checkedSizesArray = [];
  if (sAll.checked && triggerElement.id === "size-all") {
    fetchAll();
    s1.checked = false;
    s2.checked = false;
    s3.checked = false;
    s4.checked = false;
    s5.checked = false;
    return;
  } else {
    sAll.checked = false;
    if (s1.checked) {
      checkedSizesArray.push("xs");
    }
    if (s2.checked) {
      checkedSizesArray.push("s");
    }
    if (s3.checked) {
      checkedSizesArray.push("m");
    }
    if (s4.checked) {
      checkedSizesArray.push("l");
    }
    if (s5.checked) {
      checkedSizesArray.push("xl");
    }
  }
  return checkedSizesArray;
};

const sortColor = (el) => {
  let checkedColorsArray = checkedColors(el);

  clearParent();

  let filteredArray = [];
  if (checkedColorsArray.length === 1) {
    filteredArray = productsArray.filter(
      (p) => p.color === checkedColorsArray[0]
    );
  } else if (checkedColorsArray.length > 1) {
    for (let c of checkedColorsArray) {
      productsArray.filter((p) => {
        if (p.color === c) {
          filteredArray.push(p);
        }
      });
    }
  }
  newArray = filteredArray;
  renderElements(newArray);
};

const checkedColors = (triggerElement) => {
  let cAll = document.getElementById("color-all");
  let c1 = document.getElementById("color-1");
  let c2 = document.getElementById("color-2");
  let c3 = document.getElementById("color-3");
  let c4 = document.getElementById("color-4");
  let c5 = document.getElementById("color-5");

  let checkedColorsArray = [];
  if (cAll.checked && triggerElement.id === "color-all") {
    fetchAll();
    // Uncheck all other color filters
    c1.checked = false;
    c2.checked = false;
    c3.checked = false;
    c4.checked = false;
    c5.checked = false;
    return;
  } else {
    cAll.checked = false;
    if (c1.checked) {
      checkedColorsArray.push("black");
    }
    if (c2.checked) {
      checkedColorsArray.push("white");
    }
    if (c3.checked) {
      checkedColorsArray.push("red");
    }
    if (c4.checked) {
      checkedColorsArray.push("blue");
    }
    if (c5.checked) {
      checkedColorsArray.push("green");
    }
  }
  return checkedColorsArray;
};

const sortByPrice = () => {
  console.log(`Sorting by price...`);
  const arrayAfterSorting = priceSortingProcess(productsArray);

  clearParent();

  let finalSortedArray = [];
  for (let e of arrayAfterSorting) {
    let tmp = [];
    for (let p of productsArray) {
      if (p.price === e) {
        finalSortedArray.push(p);
      }
    }
  }

  renderElements(finalSortedArray);
};

const priceSortingProcess = (arr) => {
  let extractPrices = arr.map((a) => a.price);
  let arrayAfterSorting = [];

  arrayAfterSorting = extractPrices.sort((a, b) => a - b);
  console.log("Final result");
  console.log(arrayAfterSorting);

  // Remove repeated values form the array before starting working on it
  arrayAfterSorting = arrayAfterSorting.filter(
    (item, index) => arrayAfterSorting.indexOf(item) === index
  );
  console.log("After removing duplicates");
  console.log(arrayAfterSorting);

  return arrayAfterSorting;
};

const sortByPopularity = () => {
  console.log(`Sorting by popularity...`);
  const arrayAfterSorting = popularitySortingProcess(productsArray);

  clearParent();

  let finalSortedArray = [];
  for (let e of arrayAfterSorting) {
    for (let p of productsArray) {
      if (p.rating_count === e) {
        finalSortedArray.push(p);
      }
    }
  }

  renderElements(finalSortedArray);
};

const popularitySortingProcess = (arr) => {
  let extractPopularity = arr.map((a) => a.rating_count);
  let arrayAfterSorting = [];

  arrayAfterSorting = extractPopularity.sort((a, b) => a - b);
  console.log("Final result");
  console.log(arrayAfterSorting);

  // Remove repeated values form the array before starting working on it
  arrayAfterSorting = arrayAfterSorting.filter(
    (item, index) => arrayAfterSorting.indexOf(item) === index
  );
  console.log("After removing duplicates");
  console.log(arrayAfterSorting);

  return arrayAfterSorting;
};

const sortByBestRating = () => {
  console.log(`Sorting by best rating...`);
  const arrayAfterSorting = bestRatingSortingProcess(productsArray);

  clearParent();

  let finalSortedArray = [];
  for (let e of arrayAfterSorting) {
    for (let p of productsArray) {
      if (p.rating === e) {
        finalSortedArray.push(p);
      }
    }
  }

  renderElements(finalSortedArray);
};

const bestRatingSortingProcess = (arr) => {
  let extractBestRating = arr.map((a) => a.rating);
  let arrayAfterSorting = [];

  arrayAfterSorting = extractBestRating.sort((a, b) => a - b);
  console.log("Final result");
  console.log(arrayAfterSorting);

  // Remove repeated values form the array before starting working on it
  arrayAfterSorting = arrayAfterSorting.filter(
    (item, index) => arrayAfterSorting.indexOf(item) === index
  );
  console.log("After removing duplicates");
  console.log(arrayAfterSorting);

  return arrayAfterSorting;
};
