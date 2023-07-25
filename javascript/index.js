var siteList = []; 

var siteNameInput = document.getElementById("siteName");
var urlInput = document.getElementById("url");

if (localStorage.getItem("siteList")) {
    siteList=  JSON.parse(localStorage.getItem("siteList"))
    display(siteList)
}

  
function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  function addSite() {
  
    var siteName = siteNameInput.value.trim();
    var url = urlInput.value.trim();
  
    if (siteName === "" || url === "") {
      sweetAlert("", "    Please enter both Site Name and URL  ", "error");
      

      return;
    }


    for (let index = 0; index < siteList.length; index++) {
   if (siteName.toLowerCase() === siteList[index].name.toLowerCase()) {
      sweetAlert("Site already exists.", "Name is already saved.", "warning");
      return;
    }
    }

    for (let index = 0; index < siteList.length; index++) {
      for (let index = 0; index < siteList.length; index++) {
   if (url.toLowerCase() === siteList[index].url.toLowerCase()) {
     sweetAlert("Site already exists.", "URL is already saved.", "warning");
     return;
   }
 }

   }

   
    if (siteName.length<3) {
        
      sweetAlert("Oops...", "Site name must be at least 3 letters", "error");
      return;
    }
  
    if (!isValidURL(url)) {
      sweetAlert("Invalid URL.", "  Please enter a valid URL.", "error");

     
      return;
    }
  
    var website = {
      name: siteName,
      url: url,
    };
    swal("Good job!", "You added the site!", "success")

  
    siteList.push(website);
    display(siteList);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    clear()
  }
  


function display(list) {
    var box=''
    for (let index = 0; index < list.length; index++) {
box+=`  <tr>
<td>${index+1}</td>
<td>${list[index].name}</td>
<td> <button class="btn-success btn" onclick="visitSite(${index})"><i class="fa-solid fa-eye"></i> Visit</button></td>


<td> <button onclick="deletedata(${index})" class="btn btn-danger"> <i class="fa-solid fa-trash-can "></i>Delete</button></td>

</tr>
`
        
    }
    document.getElementById("dataShow").innerHTML=box
}

function deletedata(index){
    siteList.splice(index,1)
    localStorage.setItem("siteList",JSON.stringify(siteList))

    display(siteList)
 }
    
    function visitSite(index) {
        if (siteList[index] && siteList[index].url) {
          const url = siteList[index].url;
          window.open(url, "_blank"); 
        }
    
}
function clear() {
  siteNameInput.value=""
  urlInput.value=""

}