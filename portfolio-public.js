(() => {
  const URL = "https://zsukevnokaglbqjayiad.supabase.co";
  const KEY = "sb_publishable_FPEsAYveHVohxtsCgsY_ag_tXweR-wg";
  const init = async () => {
    if (!window.supabase || !document.querySelector(".projects-grid")) return;
    const client = window.supabase.createClient(URL, KEY);
    const {data,error}=await client.from("portfolio_projects").select("id,title,description,category,project_url,image_url").eq("published",true).order("sort_order").order("created_at",{ascending:false});
    if(error || !data || !data.length) return;
    const grid=document.querySelector(".projects-grid");
    data.forEach((p)=>{
      const card=document.createElement("article"); card.className="project-card admin-project-card";
      if(p.image_url){const image=document.createElement("img");image.src=p.image_url;image.alt="";image.loading="lazy";image.className="admin-project-image";card.append(image);}
      const info=document.createElement("div");info.className="project-info";
      const copy=document.createElement("div");const h=document.createElement("h3");h.textContent=p.title;
      const desc=document.createElement("p");desc.textContent=p.description;
      const tag=document.createElement("small");tag.className="project-status";tag.textContent=p.category;
      copy.append(h,desc,tag);info.append(copy);
      if(p.project_url){const a=document.createElement("a");a.href=p.project_url;a.target="_blank";a.rel="noopener noreferrer";a.textContent="↗";a.setAttribute("aria-label","Open "+p.title);info.append(a);}
      card.append(info);grid.append(card);
    });
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();