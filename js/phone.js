// function loadPhone(){
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data))
// }
// loadPhone();

const loadPhone = async (searchText='13',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};

// same work  but normal function use kora and arrow function use kora arrow function use korle facility holo code kom lekha laghe

// function displayPhones (phones){
//     for(const phone of phones){
//         console.log(phone);
//     }
// }

const displayPhones = (phones,isShowAll) => {
    // console.log(phones);

    // 1.select container
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards 
    // phoneContainer.textContent = '';
    phoneContainer.textContent = '';

    // console.log(phones.length);
    // display only first 10 phones if there are more then 12 phones 
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all', isShowAll);
// display only first 12 phons if not show all
    if(!isShowAll){
        phones = phones.splice(0,12);
    }


    phones.forEach((phone) => {
    //   console.log(phone);
    //2. create a div
    const phoneCard =document.createElement("div");
    // 3.set inner HTML
    phoneCard.classList=("card bg-gray-100 shadow-xl p-4");
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
        <button onclick="handlerShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
        // append child
    phoneContainer.appendChild(phoneCard);
  });
//    hide loading spinner 
    toggleLoadingSpinner(false);
};

// 
const handlerShowDetails= async(id) =>{
    // console.log('click kora hoise',id);

    // loaded single data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone)=>{

    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img class="mx-auto my-3" src="${phone.image}">
    <p><span class="font-bold">brand:</span> ${phone?.brand}</p>
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size :</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">chipSet:</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">memory:</span> ${phone.mainFeatures.memory}</p>
    <p><span class="font-bold">slug:</span> ${phone.slug}</p>
    <p><span class="font-bold">releaseDate:</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">GPS:</span> ${phone.others?.GPS || 'No GPS Available'}</p>


    `
    // show the modal 
    show_details_modal.showModal();
}

// handler search button 
const handlerSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   console.log(searchText);
   loadPhone(searchText,isShowAll);
}



// // handler search 2 or recap ------->

// const handlerSearch2= () =>{
//     toggleLoadingSpinner(true);
//     const searchField2=document.getElementById('search-field2');
//     const searchText2 = searchField2.value;
//     // console.log(searchText2);
//     loadPhone(searchText2);
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handlerShowAll = () =>{
    handlerSearch(true);
}

loadPhone();
