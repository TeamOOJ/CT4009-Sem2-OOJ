function listBikesInDB() {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('BikesObjectStore');
    startDB(function() {
        listBikeData();
    })
}

function listBikeData() {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
            var len = results.length, s;

            for (s = 0; s < len; s++) {
                if(results[s].owner != "") {
                    bikeOwnerID = results[s].owner;
                    
                    /* Insert a new item to the stolenBikeList using HTML, filling in the variables with JS */
                    if (results[s].theftStatus == "na" || results[s].theftStatus == undefined) {
                        stolenBikesList.innerHTML += '<div data-grid="col-4 pad-6x"><div data-grid="col-12"><section class="m-content-placement-item f-size-medium"><picture><img srcset="http://placehold.it/491x276" src="http://placehold.it/491x276" alt="Placeholder with grey background and dimension watermark without any imagery"></picture><div><h3 class="c-heading">' + results[s].owner + '\'s bike</h3><p class="c-paragraph"><ul class="c-list f-lean"><li>Victim: ' + results[s].owner + '</li><li>When: 26/12/2017 16:12</li><li>Where: Cheltenham Spa area</li><li>Who: 2 suspects</li><li>What: ' + results[s].colour + ' ' + results[s].type + '</li></ul></p><a href="#" class="c-call-to-action c-glyph"><span>CALL TO ACTION</span></a></div></section></div></div>';
                    } else {
                        stolenBikesList.innerHTML += '<div data-grid="col-4 pad-6x"><div data-grid="col-12"><section class="m-content-placement-item f-size-medium"><picture><img srcset="http://placehold.it/491x276" src="http://placehold.it/491x276" alt="Placeholder with grey background and dimension watermark without any imagery"></picture><div><strong class="c-badge f-small f-highlight reportStatusBadge ' + results[s].theftStatus.toString().toLowerCase() + '">' + results[s].theftStatus.toString().toUpperCase() + '</strong><h3 class="c-heading">' + results[s].owner + '\'s bike</h3><p class="c-paragraph"><ul class="c-list f-lean"><li>Victim: ' + results[s].owner + '</li><li>When: 26/12/2017 16:12</li><li>Where: Cheltenham Spa area</li><li>Who: 2 suspects</li><li>What: ' + results[s].colour + ' ' + results[s].type + '</li></ul></p><a href="#" class="c-call-to-action c-glyph"><span>CALL TO ACTION</span></a></div></section></div></div>';
                    }

                    result = true;
                }
            }

            if (result == true) {
                console.log("Loaded bikes successfully");
            } else {
                console.log("Error: Failed to load any bikes of yours");
            }
        }
    })
}

function viewBikeInDB(bikeNick) {
    setDatabaseName('gloucestershireConstabulary', ['UsersObjectStore', 'BikesObjectStore']);
    setCurrObjectStoreName('BikesObjectStore');
    startDB(function() {
        viewBikeData(bikeNick);
    })
}

function viewBikeData(bikeNick) {
    selectAll(function(results) {
        var result = false;
        if (!results || !results.length) {

        } else {
            var len = results.length, b;

            for (b = 0; b < len; b++) {
                if(sessionUserID === results[b].owner && bikeNick == results[b].nickname) {
                    bikeOwnerID = results[b].owner;
                    editBikeNicknameTextbox.value = results[b].nickname;
                    editBikeManufacturerTextbox.value = results[b].manufacturer;
                    editBikeModelTextbox.value = results[b].model;
                    editBikeTypeTextbox.value = results[b].type;
                    editBikeMPNTextbox.value = results[b].mpn;
                    editBikeColourTextbox.value = results[b].colour;
                    editBikeWheelSizeTextbox.value = results[b].wheelsize;
                    editBikeGearCountTextbox.value = results[b].gearCount;
                    editBikeBrakeTypeTextbox.value = results[b].braketype;
                    editBikeSuspensionTextbox.value = results[b].suspension;
                    editBikeGenderTextbox.value = results[b].gender;
                    editBikeAgeGroupTextbox.value = results[b].agegroup;
                    editBikeCommonHomeTextbox.value = results[b].commonhome;
                    editBikeUseCaseTextbox.value = results[b].usecase;
                    editBikeAdditionalDetailsTextarea.value = results[b].additionaldetails;
                    
                    //debugClickedElement.children[1].children[0].innerText = results[b].nickname; // bike tile title
                    //debugClickedElement.children[1].getElementsByTagName("ul")[0].children[0].innerText = "Manufacturer: " + results[b].manufacturer; // bike tile manufacturer details preview
                    //debugClickedElement.children[1].getElementsByTagName("ul")[0].children[1].innerText = "Model: " + results[b].model; // bike tile model details preview
                    //debugClickedElement.children[1].getElementsByTagName("ul")[0].children[2].innerText = "Colour: " + results[b].colour; // bike tile colour details preview

                    result = true;
                }
            }

            if (result == true) {
                console.log("Loaded bike data successfully");
            } else {
                console.log("Error: Failed to load bike data");
            }
        }
    })
}

