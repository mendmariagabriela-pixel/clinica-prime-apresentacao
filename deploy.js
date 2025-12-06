const { execSync } = require("child_process");
const fs = require("fs");

// ⚙️ URL fixa do repositório no GitHub
const REPO_URL = "https://github.com/mendmariagabriela-pixel/clinica-prime-apresentacao.git";

function run(cmd, ignoreError = false) {
  console.log(`\n▶ ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    if (!ignoreError) {
      throw err;
    } else {
      console.log("⚠️ Erro ignorado neste comando.");
    }
  }
}

// 1. Garante que existe repositório Git
if (!fs.existsSync(".git")) {
  console.log("📌 Repositório Git não encontrado. Criando...");
  run("git init");
}

// 2. Configura ou atualiza o remote 'origin'
console.log("📌 Ajustando remote 'origin'...");
run("git remote remove origin", true); // ignora erro se não existir
run(`git remote add origin ${REPO_URL}`, false);

// 3. Adiciona arquivos e cria commit
run("git add .");
const commitMessage = `Atualização automática - ${new Date().toLocaleString("pt-BR")}`;
run(`git commit -m "${commitMessage}" || echo Nenhuma alteração para commitar`, true);

// 4. Garante branch main e envia pro GitHub
run("git branch -M main", true);
run("git push -u origin main");

console.log("\n🎉 Deploy concluído com sucesso!");
console.log("🔗 Repositório:", REPO_URL);
