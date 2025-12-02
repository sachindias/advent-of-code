# Advent of Code 2025 - TypeScript

TypeScript solutions for Advent of Code 2025.

## Quick Start

```bash
cd 2025-typescript
npm install    # First time only
npm run dev
```

## Setup

Install dependencies:

```bash
npm install
```

## Running Solutions

Or build and run:

```bash
npm run build
npm start
```

## Project Structure

```
src/
  ├── index.ts          # Main entry point
  ├── utils.ts          # Utility functions
  └── day1/
      ├── day1.ts       # Day 1 solution
      └── input.txt     # Day 1 input
```

## Adding a New Day

1. Create a new folder: `src/dayN/`
2. Add your solution: `src/dayN/dayN.ts`
3. Add your input: `src/dayN/input.txt`
4. Import and add the case in `src/index.ts`
