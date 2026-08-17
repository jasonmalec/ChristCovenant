# Couple photos

Filenames match the couple `id` in `../roster.js`:

| File | Couple | Status |
|---|---|---|
| `popp.jpg` | Josh & Lizzie Popp | have it |
| `sanderfer.jpg` | Christian & Laura Sanderfer | have it |
| `matistic.jpg` | Ben & Callye Ann Matistic | **needed** — weren't at the first gathering |
| `braddy.jpg` | Cooper & Kelley Braddy | have it |
| `tsang.jpg` | Michael & Abigail Tsang | have it |
| `keyes.jpg` | Thomas & Holly Keyes | **needed** — weren't at the first gathering |
| `whitmire.jpg` | Ben & Libby Whitmire | have it |
| `walker.jpg` | Kennison & Connor Walker | have it |
| `malec.jpg` | Jason & Meredith Malec | have it |

The app never renders a broken image — a couple with no photo gets a monogram
avatar in the accent color instead, so adding photos is always optional and
never urgent.

**Where photos actually live:** the app stores them in Supabase Storage, uploaded
through each couple's profile page. This folder is the archival copy so the
originals aren't only inside one hosting account.
