---
marp: true
theme: default
paginate: true
class: lead
---


# Installer et utiliser **nvm (Node Version Manager)**

`nvm` permet de :

- Installer **plusieurs versions de Node.js** (par ex. Node 16, 18, 20).
- Passer de l'une à l'autre facilement.
- Éviter les conflits entre projets (ex. un projet React sur Node 20 et un autre sur Node 18).

---

## macOS / Linux

### **Étape 1 : Installer nvm**

1. Ouvre un terminal.

2. Installe `nvm` via la commande officielle :

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

   ou avec `wget` :

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

---

3. Recharge le terminal ou exécute :

   ```bash
   source ~/.bashrc
   # ou selon ton shell :
   source ~/.zshrc
   source ~/.profile
   ```

4. Vérifie que `nvm` est bien installé :

   ```bash
   nvm --version
   ```

---

### **Étape 2 : Installer des versions de Node**

Installe par exemple la dernière version LTS :

```bash
nvm install --lts
```

Ou une version précise :

```bash
nvm install 18
nvm install 20
```

---

### **Étape 3 : Utiliser une version spécifique**

```bash
nvm use 18
```

Tu peux vérifier :

```bash
node -v
```

---

### **Étape 4 : Définir une version par défaut**

Pour que Node utilise toujours une version précise au démarrage du terminal :

```bash
nvm alias default 20
```

---

### **Étape 5 : Lister les versions installées**

```bash
nvm ls
```

et pour voir les versions disponibles :

```bash
nvm ls-remote
```

---

## Windows

Sous Windows, il faut installer **nvm for Windows**, un port officiel maintenu par la communauté.

### **Étape 1 : Télécharger**

👉 [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

Télécharge le fichier `nvm-setup.exe` (dernière version stable).

---

### **Étape 2 : Installer**

- Lance l'installeur.
- Choisis un dossier d'installation (ex. `C:\nvm`).
- Laisse le dossier de Node par défaut (`C:\Program Files\nodejs`).

---

### **Étape 3 : Utilisation**

Dans PowerShell ou CMD :

Installer une version :

```bash
nvm install 20.11.1
```

Utiliser une version :

```bash
nvm use 20.11.1
```

---

Lister les versions installées :

```bash
nvm list
```

Vérifier :

```bash
node -v
npm -v
```

---

##  Exemples pratiques

- Installer la dernière LTS :

  ```bash
  nvm install --lts
  nvm use --lts
  ```
- Installer et basculer vers une version spécifique :

  ```bash
  nvm install 18
  nvm use 18
  ```
- Supprimer une version :

  ```bash
  nvm uninstall 18
  ```

