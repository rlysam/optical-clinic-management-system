
// attendant upload profile picture
const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

// if user hover
imgDiv.addEventListener('mouseenter', function () {
    uploadBtn.style.opacity = "1"
});

// if we hover out from img div
imgDiv.addEventListener('mouseleave', function () {
    uploadBtn.style.opacity = "0.7";
});


// showing image functionality when uploaded an image
file.addEventListener('change', function () {
    // refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
})



// hiding/showing of attendant table and archives 
var archiveListButton = document.getElementById("archive-list-button");
var createNewButton = document.getElementById("create-new-button");
var attendantTableData = document.getElementById("attendants-table-data");
var archiveTableData = document.getElementById("archives-tab");

archiveListButton.addEventListener("click", function () {
    archiveListButton.style.display = "none";
    createNewButton.style.display = "none";
    attendantTableData.style.display = "none";
    archiveTableData.style.display = "block";
});

function checkAll() {
    let checkboxs = document.getElementsByName("archive-check");
    let checkAll = document.getElementById("check-all-attendant");
    
    if(checkAll.checked == true) {
        for(let checkbox of checkboxs) {
            checkbox.checked = true;
        }
    }
    else {
        for(let checkbox of checkboxs) {
            checkbox.checked = false;
        }
    }
    
    updateArchiveCount();
}

function updateArchiveCount() {
    let checkboxs = document.getElementsByName("archive-check");
    let checkCount = 0;
    let archiveCounter = document.getElementById("archive-counter");

    for(let checkbox of checkboxs) {
        if(checkbox.checked == true) {
            checkCount += 1;
        }
    }

    archiveCounter.textContent = archiveCounter.textContent.replace(/[0-9]/g, checkCount);
}
