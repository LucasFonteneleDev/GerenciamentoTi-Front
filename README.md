# 💻 GerenciamentoTI — Frontend

Interface web do sistema de gerenciamento de **equipamentos, patrimônio e chamados de TI**.

O projeto foi desenvolvido em **React**, utilizando conceitos de **Atomic Design** e geração programática de componentes e telas CRUD.

## 🚀 Tecnologias

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-02569B?style=flat&logo=fastapi&logoColor=white)

## 📌 Sobre o projeto

O sistema surgiu da necessidade de controlar o **patrimônio, os equipamentos e o histórico de chamados de TI**, além de servir como um projeto prático para desenvolvimento e evolução de habilidades em frontend.

Durante o desenvolvimento, surgiu a possibilidade de explorar uma abordagem diferente para a criação das telas administrativas: a **geração programática de interfaces CRUD**.

## 🧩 Atomic Design

O frontend utiliza conceitos do **Atomic Design** para organizar e reutilizar componentes da interface.

A ideia é reduzir a necessidade de desenvolver manualmente estruturas semelhantes para cada recurso do sistema.

```text
Componentes básicos
       ↓
Componentes compostos
       ↓
Estruturas reutilizáveis
       ↓
Telas CRUD
```

Essa abordagem permite maior padronização entre as telas e facilita a manutenção da aplicação.

## ⚙️ Geração programática de CRUDs

Um dos principais objetivos técnicos do projeto é explorar a geração programática de telas CRUD.

A proposta exige um investimento inicial maior em arquitetura e abstração, mas busca reduzir a quantidade de código repetitivo necessário para adicionar novos recursos.

Com isso, novos módulos podem aproveitar estruturas já existentes, mantendo um padrão visual e comportamental entre as diferentes telas.

### Objetivos da abordagem

- ♻️ Reduzir código repetitivo
- 🧩 Reutilizar componentes
- 📐 Padronizar interfaces
- 🔧 Facilitar manutenção
- 📈 Facilitar a evolução do sistema

## 🔌 Integração com o Backend

O frontend se comunica com uma **API REST** desenvolvida separadamente em C# / ASP.NET Core.

👉 **[ControleChamadosTI — Backend](https://github.com/LucasFonteneleDev/GerenciamentoTi-Backend)**

```text
┌─────────────────────┐
│       React         │
│      Frontend       │
└──────────┬──────────┘
           │
           │ HTTP / REST
           ▼
┌─────────────────────┐
│    ASP.NET Core     │
│        API          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

## 🎯 Objetivo

Mais do que um sistema de gerenciamento, este projeto funciona como um ambiente para experimentar soluções relacionadas a:

- arquitetura de frontend;
- reutilização de componentes;
- geração programática de interfaces;
- integração com APIs REST;
- padronização de aplicações administrativas;
- escalabilidade e manutenção de código.

---