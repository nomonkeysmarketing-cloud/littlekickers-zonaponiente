# Little Kickers Zona Poniente — Minisite

> **Versión de producción**: `index.html` (todos los assets embebidos localmente)  
> **URL en vivo**: https://littlekickers-zonaponiente.vercel.app/

---

## Estado del proyecto

### ✅ Funcionalidades completadas

- Hero full-bleed con video `videos/video-hero.mp4` y overlay multicapa
- Header fijo, fondo blanco permanente, logo rojo `#E31F26` (Brand Guidelines 2025)
- WhatsApp CTA con número real: **+52 1 55 6535 2797** en TODAS las secciones
- 11 fotos profesionales integradas con rutas locales (`images/`)
- Secciones: Trust Bar, Pilares, Filosofía Play not Push, 4 Programas, Cómo es una clase, 3 Sedes, Testimonios, FAQ, CTA Final y Footer
- Responsive: desktop, tablet y móvil (≤768 px, ≤480 px)
- Sticky WhatsApp button (bottom-right)
- Scroll-reveal animations

### 📁 Estructura de archivos

```
littlekickers-zonaponiente/
├── index.html               ← Página principal (PRODUCCIÓN)
├── images/
│   ├── foto-partido.jpg         (NPTTBEC7) — Niños en partido
│   ├── foto-brazos-arriba.jpg   (oWlnzYMx) — Niño celebrando
│   ├── foto-corriendo.jpg       (RPGrdi03) — Niño corriendo
│   ├── foto-corazon.jpg         (GKIGeQCO) — Niña corazón
│   ├── foto-confianza.jpg       (8DOcV3fl) — Niña bajo cielo azul
│   ├── foto-highfive.jpg        (zH7MRGSd) — Coach + niño high-five
│   ├── foto-papa-hija.jpg       (YR5EfFQF) — Papá + hija con balón
│   ├── foto-manos-equipo.jpg    (Nx49dyEP) — Manos en equipo
│   ├── foto-balon-pie.jpg       (bWYDN1vQ) — Pie en balón
│   ├── foto-papa-bebe.jpg       (3zdpf3kz) — Papá con bebé y portería
│   └── foto-pies-balones.jpg    (iv2yMBwM) — Pies y balones
├── videos/
│   └── video-hero.mp4           (6sIgt8lq) — Hero video background
├── hero-foto.html           ← Prototipo (no producción)
├── hero-video.html          ← Prototipo (no producción)
├── hero-foto2.html          ← Prototipo (no producción)
└── hero-video-fix.html      ← Prototipo (no producción)
```

---

## Deploy en Vercel (paso a paso)

### Prerequisitos
- Cuenta GitHub: https://github.com
- Cuenta Vercel: https://vercel.com
- Git instalado (`git --version`)

### Opción A — Con GitHub (recomendada para actualizaciones futuras)

```bash
# 1. Clonar o crear el repositorio local
mkdir littlekickers-zonaponiente && cd littlekickers-zonaponiente

# 2. Copiar los archivos descargados de Genspark aquí
#    (index.html + carpetas images/ y videos/)

# 3. Inicializar git
git init
git add .
git commit -m "Little Kickers Zona Poniente - launch v1.0"

# 4. Crear repositorio en GitHub (sin README ni .gitignore)
#    y conectar:
git remote add origin https://github.com/TUUSUARIO/littlekickers-zonaponiente.git
git branch -M main
git push -u origin main

# 5. En Vercel:
#    → vercel.com → Add New Project → Import Git Repository
#    → Selecciona "littlekickers-zonaponiente"
#    → Framework: Other (Static Site)
#    → Deploy ✓
```

### Opción B — Drag & Drop (sin GitHub)

1. Ir a https://vercel.com/new
2. Hacer clic en **"Deploy without a Git repository"**
3. Arrastrar la carpeta completa `littlekickers-zonaponiente/`
4. Clic en **Deploy**

### Dominio personalizado (opcional)

En Vercel → Settings → Domains → añadir `www.littlekickerszonaponiente.com.mx`  
Vercel provee registros DNS (A + CNAME) para configurar en GoDaddy/Namecheap.  
HTTPS automático activado.

### Actualizaciones futuras (con GitHub)

```bash
# Editar index.html o añadir archivos, luego:
git add .
git commit -m "Descripción del cambio"
git push
# Vercel redeploya automáticamente en ~20 segundos ✓
```

---

## Datos del cliente

- **Número WhatsApp**: +52 1 55 6535 2797
- **Sedes**: Casacarita Park (Interlomas/Huixquilucan/Bosques), Merici Colegio (Santa Fe/Cuajimalpa/Bosques), El Sope Chapultepec
- **Programas**: Little Kicks (18m–2.5a), Junior Kicks (2.5–3.5a), Mighty Kicks (3.5–5a), Mega Kicks (5–8a)
- **Metodología**: Play not Push — Little Kickers International

---

## Funcionalidades pendientes / mejoras sugeridas

- [ ] Integrar horarios reales por sede (cuando el cliente los provea)
- [ ] Añadir Google Maps embed para cada sede
- [ ] Galería de fotos de sesiones reales (clases en vivo)
- [ ] Pixel de Meta/Google Analytics para tracking de conversiones
- [ ] Formulario de contacto (requiere servicio externo: Formspree, Netlify Forms)
- [ ] Versión en inglés (para familias expatriadas en Santa Fe / Bosques)
