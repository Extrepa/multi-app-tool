# Shared Scene Templates

**Source:** Extracted from errl_scene_builder (deprecated)  
**Date:** 2026-01-09

## Overview

This directory contains 5 scene templates that can be used as starter scenes for scene composition tools.

## Templates

1. **LAB_INTRO** - Simple lab with one Errl head
2. **GRANDMA_TV** - Cozy room with a TV prop
3. **FESTIVAL_STAGE** - Outdoor stage with flags and riser
4. **VOID_ORBS** - Abstract void with orbs/sparkles
5. **SHRINE_ALTAR** - Altar pedestal and halo

## Template Structure

Each template is a valid `ErrlScene` JSON with:
- `isTemplate: true`
- `id`: stable template id
- `name`: human-readable label
- `description`: short guidance
- Background planes
- Minimal entities for illustration

## Usage

### In multi-tool-app

```typescript
import LAB_INTRO from '@/shared/templates/scenes/LAB_INTRO.json';
// Use template to initialize scene
```

### In Other Projects

```typescript
import { readFileSync } from 'fs';
const template = JSON.parse(readFileSync('shared/templates/scenes/LAB_INTRO.json', 'utf8'));
```

## Schema

Templates use the ErrlScene JSON schema. See:
- `errl_scene_builder/docs/current/specs/ERRL_SCENE_SYNTH_SCENE_SCHEMA.md` (source)
- May need adaptation for different scene schemas

## Notes

- Templates are starter scenes for onboarding
- Can be customized for specific projects
- Schema may need adaptation for multi-tool-app
- Original source: errl_scene_builder (deprecated)
