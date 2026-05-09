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
- **AI API integration** (Groq/OpenAI-compatible with Llama models)
- **Repository ingestion pipeline** with automated code chunking
- **Embedding generation** using transformer models (Xenova/all-MiniLM-L6-v2)
- **Vector database integration** (PostgreSQL with pgvector)
- **Semantic repository search** with multiple retrieval strategies
- **Repository-aware AI chat** with streaming responses
- **Interactive chat interface** with message persistence
- **Docker infrastructure** for local development
- **Modular backend utilities** for embeddings, similarity, and file processing

## Planned

- PR review assistant
- Architecture summarization
- Multi-agent engineering workflows
- GitHub integration
- Evaluation & observability systems

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
- Xenova Transformers (client-side embeddings)
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
- Developer productivity tooling
- Real-time streaming AI responses

---

# Project Status

🚧 Active Development

Current phase: Full RAG implementation with vector search, AI chat, and interactive UI.

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
   npm install
   ```

3. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

4. **Setup database schema**
   ```bash
   curl http://localhost:3000/api/setup-db
   ```

5. **Ingest codebase** (optional - indexes the current project)
   ```bash
   curl http://localhost:3000/api/ingest
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000/chat` to interact with the AI assistant.

---

# API Endpoints

- `GET /api/chat` - Basic RAG chat (no persistence)
- `GET /api/repo-chat` - Repository-aware chat with vector search
- `GET /api/search` - Semantic code search
- `GET /api/vector-search` - Vector database search
- `GET /api/embeddings` - Test embedding generation
- `GET /api/files` - List and chunk project files
- `GET /api/ingest` - Ingest codebase into vector database
- `GET /api/setup-db` - Initialize database schema
- `GET /api/db` - Test database connection
- `GET /api/test` - Test AI API connection

---

# Vision

The long-term goal is to build an AI-native engineering workspace capable of understanding repositories, assisting developers, and orchestrating intelligent software workflows with production-ready RAG infrastructure.
