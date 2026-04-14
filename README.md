# 🎂 Barcelona Birthday Planner

A private voting website for a surprise 50th birthday trip to Barcelona. Three people (Aaron, Will, Matt) each vote on activities they'd like to do, and the results page shows everyone's preferences side-by-side.

**Live site**: https://undert0e-505.github.io/barcelona-birthday/?v=srka38td (requires voter code)

## How It Works

- Each person gets a unique URL with an unguessable 8-character code
- They vote Love / OK / Nah on each activity
- Votes save to the server (KVdb.io) and local storage
- The results page shows all three people's votes for comparison
- No cross-visibility — nobody can see another person's votes until they visit the results page

## Voting URLs

| Person | URL |
|--------|-----|
| Aaron | `https://undert0e-505.github.io/barcelona-birthday/?v=srka38td` |
| Will | `https://undert0e-505.github.io/barcelona-birthday/?v=d1tifg18` |
| Matt | `https://undert0e-505.github.io/barcelona-birthday/?v=ntrmfid2` |
| Results | `https://undert0e-505.github.io/barcelona-birthday/results.html` |

⚠️ **Never send more than one person's voting link in the same email.** The kids are devious.

## Architecture

### Files

| File | Purpose |
|------|---------|
| `index.html` | Voting page — all HTML/CSS/JS inline, no frameworks |
| `results.html` | Comparison page — shows all three voters side-by-side |
| `img/` | Activity images (400×300px JPEGs, stored locally) |
| `votes/` | Legacy directory (unused, from earlier backend approach) |

### Backend: KVdb.io

Free, CORS-friendly key-value store. No auth required.

| Person | Bucket ID |
|--------|-----------|
| Aaron | `2tZBHj94Jcbys5VGTxTCJ8` |
| Will | `6Vtn3PxJJXZyMMEyAwBd72` |
| Matt | `QekwxQHq5uJfqVonojJUrc` |

Each bucket stores a single key `/votes` containing a JSON object like:
```json
{"sagrada": "love", "churros": "ok", "campnou": "nah"}
```

API pattern: `https://kvdb.io/{BUCKET_ID}/votes`

### Key Data Structures

**`index.html`** — `ITEMS` array (full detail):
```js
{ id:'sagrada', name:'La Sagrada Família', desc:'...', cat:'sights', img:'img/sagrada.jpg', link:'https://maps.google.com/?q=...' }
```

**`results.html`** — `ALL_ITEMS` array (lighter):
```js
{ id:'sagrada', name:'La Sagrada Família', cat:'sights' }
```

Categories: `sights`, `activities`, `food`, `beach`

## Activities (27)

### 🏛️ Sights
- `sagrada` — La Sagrada Família
- `parkguell` — Park Güell
- `casabatllo` — Casa Batlló
- `casamila` — Casa Milà
- `gothic` — Gothic Quarter
- `lasramblas` — La Rambla
- `boqueria` — Mercat de la Boqueria
- `montjuic` — Montjuïc
- `picasso` — Picasso Museum

### 🎯 Activities
- `campnou` — Camp Nou Experience
- `flamenco` — Flamenco Show
- `bikes` — Bike Tour
- `cooking` — Cooking Class
- `cablecar` — Port Cable Car
- `segway` — Segway Tour
- `aquarium` — L'Aquàrium
- `escape` — Escape Room

### 🍽️ Food
- `smokehouse` — Smoked BBQ
- `steakhouse` — Steakhouse
- `ramen` — Ramen / Japanese
- `dimsum` — Dim Sum / Chinese
- `tapas` — Tapas Crawl
- `paella` — Authentic Paella
- `pinxtos` — Pintxos Night
- `churros` — Churros & Chocolate

### 🏖️ Beach
- `barceloneta` — Barceloneta Beach
- `bogatell` — Bogatell Beach

## Adding an Activity

1. Find an appropriate image, download to `img/{id}.jpg` (400×300px JPEG)
2. Add to `ITEMS` array in `index.html`
3. Add to `ALL_ITEMS` array in `results.html`
4. Both must match on `id`, `name`, and `cat`
5. Commit and push — GitHub Pages auto-deploys

## Removing an Activity

1. Delete from `ITEMS` in `index.html`
2. Delete from `ALL_ITEMS` in `results.html`
3. Optionally delete image from `img/`
4. Commit and push

## Links Policy

- Activity "More info" links → Google Maps (`https://maps.google.com/?q=Place+Name+Barcelona`)
- Tour company links → their actual website URL
- Reason: official sites render as raw HTML in Telegram's in-app browser; Google Maps works everywhere

## Images Policy

- 400×300px JPEG, stored locally in `img/`
- Wikipedia Commons is reliable; Pexels/Unsplash IDs may not match expected subjects
- Always verify downloaded images match the activity

## Deployment

GitHub Pages auto-deploys from the `main` branch. Push = live within 1-2 minutes. No build step.

## Checking Votes

```bash
echo "Aaron:"; curl -s https://kvdb.io/2tZBHj94Jcbys5VGTxTCJ8/votes
echo "Will:"; curl -s https://kvdb.io/6Vtn3PxJJXZyMMEyAwBd72/votes
echo "Matt:"; curl -s https://kvdb.io/QekwxQHq5uJfqVonojJUrc/votes
```

## ⚠️ Do Not Use

These backends have CORS issues (browser blocks PUT requests):
- `jsonbin-zeta.vercel.app` — no CORS headers
- `jsonblob.com` — CORS preflight returns 404 on individual blob URLs

## Reset Votes (if needed)

```bash
# Clear Aaron's votes
curl -X PUT -H "Content-Type: application/json" -d '{}' https://kvdb.io/2tZBHj94Jcbys5VGTxTCJ8/votes
# Clear Will's votes
curl -X PUT -H "Content-Type: application/json" -d '{}' https://kvdb.io/6Vtn3PxJJXZyMMEyAwBd72/votes
# Clear Matt's votes
curl -X PUT -H "Content-Type: application/json" -d '{}' https://kvdb.io/QekwxQHq5uJfqVonojJUrc/votes
```