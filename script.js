const apikey="47d5b57d56a54cb6bb280ff7d639fe47";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews("India"));

function reload(){
    window.localStorage.reload();
}


async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${apikey}`);
    const data=await res.json();
    bindData(data.articles);
   // console.log(data);
}

function bindData(articles){
    const cardsContainer=document.getElementById("card-container");
    const newsTemplate=document.getElementById("template-news-card");
    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return ;
        const cardClone=newsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function  fillDataInCard(cardClone,article){
    const newImg=cardClone.querySelector("#news-img");
    const newTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#newS");
    const newDesc=cardClone.querySelector("#news-desc");
    newImg.src=article.urlToImage;
    newTitle.innerHTML=article.title;
    newDesc.innerHTML=article.description;

     const date=new Date(article.publishedAt).toLocaleString("en-US",{
         timeZone:"Asia/Jakarta"
     });

    newsSource.innerHTML=`${article.source.name}-${date}`;
    
cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
})
}

let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem;
    curSelectedNav.classList.add("active");
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("searc");

searchButton.addEventListener("click", ()=>{
    const query=searchText.value;
    if(!query) return ;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
})

