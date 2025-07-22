import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as m,i as r,S as d}from"./assets/vendor-DWXSRYDZ.js";const _=document.querySelector(".search__input"),b=document.querySelector("button"),h="https://pixabay.com/api/",f="51405518-123002757a861b136415ef994",c=document.querySelector(".gallery"),t=document.querySelector(".loader"),i=document.querySelector(".load-more"),y=40;let g=1;c.getBoundingClientRect().height;t.style.display="none";i.style.display="none";b.addEventListener("click",()=>{const e=_.value.trim();e?$(e):alert("Please enter a search term.")});const $=async e=>{g=1,t.style.display="block";const p=`${h}?key=${f}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safe_search=true&page=${g}&per_page=${y}`;try{const o=(await m.get(p)).data;if(o.hits.length===0){t.style.display="none",r.error({title:"No results found",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c.innerHTML=o.hits.map(s=>`
                <div class="gallery__item">
                    <a href="${s.largeImageURL}" class="gallery__item">
                        <img src="${s.webformatURL}" alt="${s.tags}" class="gallery__image" />
                    </a>
                    <div class="gallery__info">
                        <p class="gallery__info_item"><b>Likes</b> ${s.likes}</p>
                        <p class="gallery__info_item"><b>Views</b> ${s.views}</p>
                        <p class="gallery__info_item"><b>Comments</b> ${s.comments}</p>
                        <p class="gallery__info_item"><b>Downloads</b> ${s.downloads}</p>
                    </div>
                </div>
                `).join("");const n=new d(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1});t.style.display="none",n.refresh(),o.totalHits>y?i.style.display="block":i.style.display="none"}catch(l){t.style.display="none",r.error({title:"Error fetching images",message:l.message,position:"topRight"})}},v=async e=>{var l;t.style.display="block";const p=`${h}?key=${f}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safe_search=true&page=${g}&per_page=${y}`;try{const n=(await m.get(p)).data;if(n.hits.length===0){r.info({title:"No more images",message:"We're sorry, but you've reached the end of search results",position:"topRight"}),i.style.display="none",t.style.display="none";return}c.insertAdjacentHTML("beforeend",n.hits.map(a=>`
                    <div class="gallery__item">
                        <a href="${a.largeImageURL}" class="gallery__item">
                            <img src="${a.webformatURL}" alt="${a.tags}" class="gallery__image" />
                        </a>
                        <div class="gallery__info">
                            <p class="gallery__info_item"><b>Likes</b> ${a.likes}</p>
                            <p class="gallery__info_item"><b>Views</b> ${a.views}</p>
                            <p class="gallery__info_item"><b>Comments</b> ${a.comments}</p>
                            <p class="gallery__info_item"><b>Downloads</b> ${a.downloads}</p>
                        </div>
                    </div>
                `).join(""));const s=new d(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1}),{height:u}=((l=c.firstElementChild)==null?void 0:l.getBoundingClientRect())||{height:0};window.scrollBy({top:u*2-20,behavior:"smooth"}),t.style.display="none",s.refresh()}catch(o){t.style.display="none",r.error({title:"Error fetching more images",message:o.message,position:"topRight"})}};i.addEventListener("click",()=>{const e=_.value.trim();e?v(e):r.error({title:"Error",message:"Please enter a search term before loading more images.",position:"topRight"}),g++});
//# sourceMappingURL=page-2.js.map
