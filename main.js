
// Art institute API
const api_url = "https://api.artic.edu/api/v1/artworks";

// gets api json data
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var JSONdata = await response.json();

    console.log(JSONdata);
}

// gets API results based on search results and limits to reduce call time
async function searchAPI(url, str, pages, limit = 100) {

    searchArtwork = []

    for(let i = 1; i <= pages; i++){
        var page = url + `/search?q=${str}&fields=id,title,artist_display,date_display,main_reference_number,api_link,place_of_origin,artist_title,artist_id,category_titles,classification_title,image_id,timestamp&page=${i}&limit=${limit}`
        var response = await fetch(page);
        var pageData = await response.json();

        for(let j = 0; j<pageData.data.length; j++){
            searchArtwork.push(pageData.data[j]);
        }
    }
    return searchArtwork
}

let searchForm = document.getElementById("searchForm");

// event listener after search form is submitted
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let artGrid = document.getElementById("artGrid");
    artGrid.innerHTML = ""; // clears html when resubmitted

    userSearch = document.getElementById("userSearch").value;

    if (userSearch == "") {
        alert("Please enter a search term"); // if user doesnt enter anything
    } else {
        searchResults = searchAPI(api_url, userSearch, 1, 32);
        
        // gets value out of promise
        searchResults.then(function(result){
            result.forEach((artWork) => {
                // console.log(artWork)
                let imgURL = `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`;
                var request = new XMLHttpRequest();
                request.open("GET", imgURL, true);
                request.send();
                // test api call to image
                request.onload = function() {
                if (request.status == 200){
                    // adds image with art work information to the grid
                    artGrid.innerHTML += 
                    `<div class = "col-12 col-md-6 col-lg-4 container imgcontainer my-4">
                        <a href = "https://www.artic.edu/iiif/2/${artWork.image_id}/full/1686,/0/default.jpg"><img src=${imgURL} class="centered-and-cropped" id="${artWork.id}">
                        <div class="overlay">
                            <div class="h3">${artWork.title}</div>
                            <div>${artWork.artist_title}</div>
                            <div>${artWork.place_of_origin}, ${artWork.date_display}</div>
                            <div>${artWork.classification_title}</div>
                            <div>${artWork.main_reference_number}</div>
                        </div></a>
                    </div>`;
                }
                }
            })
        
        })
    }
    // clears form after submitted
    searchForm.reset()
});


// TODO add an advance search feature
// Defining async function
// async function getCategoryClassification(url, pages, limit = 100) {
//     var categoryArray = [];
//     var classificationArray = [];

//     for(let i = 1; i <= pages; i++){
//         var page = url + `?page=${i}&limit=${limit}`;
//         var response2 = await fetch(page);
//         var pageData = await response2.json();

//         for(let j = 0; j<pageData.data.length; j++){
//             if(categoryArray.includes(pageData.data[j].category_titles[0]) || pageData.data[j].category_titles[0] == undefined){
//                 // pass
//             } else {
//                 categoryArray.push(pageData.data[j].category_titles[0])
//             }

//             if(classificationArray.includes(pageData.data[j].classification_title) || pageData.data[j].classification_title == undefined){
//                 // pass
//             } else {
//                 classificationArray.push(pageData.data[j].classification_title)
//             }
//         }
//         categoryArray.sort()
//         classificationArray.sort()
//     }

//     let artForm = document.getElementById("artForm");

//     for(let i = 0; i < categoryArray.length; i++){
//         var option = document.createElement("option");
//         option.text = categoryArray[i];
//         document.getElementById("categorySelect").add(option, document.getElementById("categorySelect")[i]);
//     }

//     for(let i = 0; i < classificationArray.length; i++){
//         var option = document.createElement("option");
//         option.text = classificationArray[i];
//         document.getElementById("classificationSelect").add(option, document.getElementById("classificationSelect")[i]);
//     }

//     artForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         selectedClassification = document.getElementById("classificationSelect").value;
//         selectedCategory = document.getElementById("categorySelect").value;
    
//         if (selectedClassification == "none") {
//             alert("Ensure you input a value in both fields!");
//         } else {
//             // perform operation with form input
//             console.log(selectedClassification);
//         }

//         if (selectedCategory == "none") {
//             alert("Ensure you input a value in both fields!");
//         } else {
//             // perform operation with form input
//             console.log(selectedCategory);
//         }
//     });

//     console.log(categoryArray);
//     console.log(classificationArray);
// }


