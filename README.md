# AI Engineering Workspace

An AI-native developer platform for understanding, indexing, and interacting with codebases using LLMs, semantic search, and intelligent engineering workflows.

## Overview

AI Engineering Workspace is a modern RAG-powered platform that enables developers to:

- Chat with repositories using AI
- Understand architecture flows through semantic search
- Perform intelligent code analysis
- Generate implementation insights
- Analyze engineering systems using AI-powered tools

This project focuses on building production-style AI infrastructure and developer tooling workflows.

---

# Features

## Current

- **Next.js App Router architecture** with TypeScript
- **AI API integration** using Groq + Llama 3.3 70B
- **Repository-aware AI chat** with streaming responses
- **Multi-session AI workspace** with persistent conversations
- **GitHub repository import pipeline** for public repositories
- **Repository ingestion pipeline** with automated file scanning and chunking
- **Embedding generation** using Xenova/all-MiniLM-L6-v2
- **Vector database integration** using PostgreSQL + pgvector
- **Semantic repository retrieval** using cosine similarity search
- **RAG-powered contextual AI responses** grounded in repository code
- **Interactive chat UI** with sidebar sessions and dark mode workspace layout
- **Streaming AI responses** with incremental rendering
- **Reusable frontend architecture** using hooks, services, and modular components
- **Docker infrastructure** for local AI development
- **Semantic search infrastructure** for code understanding workflows

## Planned

- Retrieved context panel
- Architecture visualization
- PR review assistant
- Repository summarization
- Multi-agent engineering workflows
- GitHub OAuth & private repository support
- Evaluation & observability systems
- Code generation workflows
- Agentic developer tooling

---

# Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS
- React Markdown & Syntax Highlighting

## Backend

- Node.js
- Next.js API Route Handlers
- PostgreSQL with pgvector
- Drizzle ORM

## AI Infrastructure

- Groq API (Llama 3.3 70B)
- OpenAI-compatible SDKs
- Xenova/all-MiniLM-L6-v2 embeddings (384 dimensions)
- RAG architecture with semantic retrieval
- Cosine similarity for vector matching

## Infrastructure

- Docker & Docker Compose
- PostgreSQL vector database
- Local development setup

---

# Architecture Goals

This project explores modern AI engineering concepts including:

- Retrieval-Augmented Generation (RAG) for codebase understanding
- Codebase ingestion and chunking pipelines
- Semantic search and vector similarity
- Context engineering for AI interactions
- AI workflow orchestration
- Repository-aware conversational interfaces
- GitHub ingestion and indexing systems
- Vector retrieval pipelines for code intelligence
- Streaming AI UX patterns
- AI-native developer workspace design
- Developer productivity tooling
- Real-time streaming AI responses

---

# Project Status

🚧 Active Development

Current phase: End-to-end repository RAG system with GitHub ingestion, pgvector retrieval, semantic repository chat, and AI workspace UX.

---

# Local Development

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-engineering-workspace
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start PostgreSQL database**

   ```bash
   docker-compose up -d
   ```

4. **Start the development server**

   ```bash
   pnpm run dev
   ```

5. **Import a GitHub repository**

   Open:

   ```
   http://localhost:3000/chat
   ```

   Then use the `Import Repository` modal to ingest and index a public GitHub repository.

---

# API Endpoints

- `POST /api/import-repo` - Clone, chunk, embed, and index GitHub repositories
- `GET /api/repo-chat` - Repository-aware AI chat with semantic retrieval

---

# Vision

The long-term vision is to build an AI-native engineering workspace capable of understanding repositories, retrieving relevant architectural context, assisting developers through intelligent workflows, and evolving toward autonomous AI engineering systems.

This project explores the future of developer tooling through retrieval-augmented generation (RAG), semantic code understanding, repository intelligence, and AI-first engineering experiences.
