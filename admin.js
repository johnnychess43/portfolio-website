(() => {
  const SUPABASE_URL = "https://zsukevnokaglbqjayiad.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FPEsAYveHVohxtsCgsY_ag_tXweR-wg";
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  const allowed = ["kapeloeddybrowse@gmail.com", "johnchesiro43@gmail.com"];
  const $ = (id) => document.getElementById(id);
  const message = (id, value) => { $(id).textContent = value || ""; };
  const cleanUrl = (value) => {
    if (!value) return null;
    const parsed = new URL(value);
    if (parsed.protocol !== "https:") throw new Error("Links must use HTTPS.");
    return parsed.href;
  };
  async function currentAdmin() {
    const { data: { user }, error } = await client.auth.getUser();
    if (error || !user || !allowed.includes((user.email || "").toLowerCase())) return null;
    return user;
  }
  async function render() {
    const user = await currentAdmin();
    $("login-panel").classList.toggle("admin-hidden", !!user);
    $("dashboard").classList.toggle("admin-hidden", !user);
    if (user) await loadProjects();
  }
  async function loadProjects() {
    const { data, error } = await client.from("portfolio_projects").select("*").order("sort_order").order("created_at", {ascending:false});
    if (error) { message("project-message", error.message); return; }
    $("project-list").replaceChildren();
    data.forEach((project) => {
      const row = document.createElement("div"); row.className = "admin-row";
      const details = document.createElement("div");
      const title = document.createElement("strong"); title.textContent = project.title;
      const desc = document.createElement("p"); desc.textContent = (project.published ? "Published · " : "Draft · ") + project.category;
      details.append(title, desc);
      const actions = document.createElement("div"); actions.className = "admin-actions";
      const edit = document.createElement("button"); edit.className = "admin-button"; edit.textContent = "Edit";
      edit.addEventListener("click", () => fillForm(project));
      const remove = document.createElement("button"); remove.className = "admin-button"; remove.textContent = "Delete";
      remove.addEventListener("click", async () => {
        if (!window.confirm("Delete this project permanently?")) return;
        const {error} = await client.from("portfolio_projects").delete().eq("id", project.id);
        message("project-message", error ? error.message : "Project deleted.");
        if (!error) await loadProjects();
      });
      actions.append(edit, remove); row.append(details, actions); $("project-list").append(row);
    });
  }
  function fillForm(p) {
    $("project-id").value=p.id; $("title").value=p.title; $("description").value=p.description;
    $("category").value=p.category; $("project-url").value=p.project_url || "";
    $("image-url").value=p.image_url || ""; $("sort-order").value=p.sort_order;
    $("published").checked=p.published; window.scrollTo({top:0,behavior:"smooth"});
  }
  function clearForm() { $("project-form").reset(); $("project-id").value=""; $("category").value="PROJECT"; $("sort-order").value="0"; }
  $("login-form").addEventListener("submit", async (event) => {
    event.preventDefault(); message("login-message","Signing in…");
    const email=$("email").value.trim().toLowerCase();
    if (!allowed.includes(email)) { message("login-message","This account is not authorised."); return; }
    const {error}=await client.auth.signInWithPassword({email,password:$("password").value});
    if (error) { message("login-message","Sign-in failed. Check your credentials or use password reset."); return; }
    $("password").value=""; message("login-message","Signed in."); await render();
  });
  $("reset-button").addEventListener("click", async () => {
    const email=$("email").value.trim().toLowerCase();
    if (!allowed.includes(email)) { message("login-message","Enter one of the approved administrator emails first."); return; }
    const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin + "/admin.html"});
    message("login-message",error ? "Could not send reset email. Check Supabase email settings." : "If the account exists, a password reset email has been sent.");
  });
  $("logout-button").addEventListener("click", async () => { await client.auth.signOut(); clearForm(); await render(); });
  $("clear-button").addEventListener("click",clearForm);
  $("project-form").addEventListener("submit",async(event)=>{
    event.preventDefault(); message("project-message","Saving…");
    try {
      const payload={title:$("title").value.trim(),description:$("description").value.trim(),category:$("category").value.trim(),project_url:cleanUrl($("project-url").value.trim()),image_url:cleanUrl($("image-url").value.trim()),sort_order:Number.parseInt($("sort-order").value,10)||0,published:$("published").checked};
      const id=$("project-id").value;
      const result=id ? await client.from("portfolio_projects").update(payload).eq("id",id) : await client.from("portfolio_projects").insert(payload);
      if(result.error) throw result.error;
      clearForm(); message("project-message","Project saved."); await loadProjects();
    } catch(error) { message("project-message",error.message || "Could not save project."); }
  });
  client.auth.onAuthStateChange(() => { setTimeout(render,0); });
  render();
})();