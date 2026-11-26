export const AVAILABILITY_LABEL = {
  'in-stock': 'In stock',
  'low-stock': 'Limited stock',
  'made-to-order': 'Made to order',
  'out-of-stock': 'Out of stock',
}

export function stockFor(product, colour, size) {
  return product.stock[`${colour}|${size}`] ?? 0
}

export function totalStock(product) {
  return Object.values(product.stock).reduce((a, b) => a + b, 0)
}

export function validateProductLines(product, lines) {
  const total = lines.reduce((a, l) => a + l.qty, 0)
  const overStock =
    product.availability === 'made-to-order'
      ? []
      : lines
          .filter((l) => l.qty > stockFor(product, l.colour, l.size))
          .map((l) => ({ colour: l.colour, size: l.size, requested: l.qty, available: stockFor(product, l.colour, l.size) }))
  return {
    product,
    total,
    meetsMoq: total >= product.moq,
    shortfall: Math.max(0, product.moq - total),
    unavailable: product.availability === 'out-of-stock' || !product.published,
    overStock,
  }
}

export function validateCart(cart, products) {
  const byProduct = new Map()
  for (const l of cart) byProduct.set(l.productId, [...(byProduct.get(l.productId) ?? []), l])
  const results = []
  const missing = []
  for (const [id, lines] of byProduct) {
    const p = products.find((x) => x.id === id)
    if (!p) missing.push(id)
    else results.push(validateProductLines(p, lines))
  }
  const blocking = results.filter((r) => !r.meetsMoq || r.unavailable)
  return {
    results,
    missing,
    blocking,
    ok: cart.length > 0 && blocking.length === 0 && missing.length === 0,
    totalProducts: byProduct.size,
    totalCombos: new Set(cart.map((l) => `${l.productId}|${l.colour}`)).size,
    totalLines: cart.length,
    totalPieces: cart.reduce((a, l) => a + l.qty, 0),
  }
}

export function groupItems(items) {
  const groups = []
  for (const it of items) {
    let g = groups.find((x) => x.productId === it.productId && x.colour === it.colour)
    if (!g) {
      g = { productId: it.productId, productName: it.productName, productCode: it.productCode, colour: it.colour, sizes: [] }
      groups.push(g)
    }
    g.sizes.push({ size: it.size, qty: it.qty })
  }
  return groups
}

export function buildEnquiryMessage(e) {
  const lines = [
    'BROTHERS CLUB CLOTHING',
    'NEW WHOLESALE ENQUIRY',
    '',
    `Enquiry ID: ${e.id}`,
    '',
    'RETAILER DETAILS:',
    `Shop Name: ${e.retailer.shopName}`,
    `Owner: ${e.retailer.ownerName}`,
    `Mobile: ${e.retailer.mobile}`,
    `Location: ${e.delivery.city}, ${e.delivery.state}`,
    '',
    'ORDER DETAILS:',
    '',
  ]
  groupItems(e.items).forEach((g, i) => {
    lines.push(`${i + 1}. ${g.productName} (${g.productCode})`, `Colour: ${g.colour}`)
    g.sizes.forEach((s) => lines.push(`${s.size}: ${s.qty} pcs`))
    lines.push('')
  })
  lines.push(`TOTAL QUANTITY: ${e.totalPieces} PCS`, '')
  if (e.instructions.trim()) lines.push('Additional Requirements:', e.instructions.trim(), '')
  lines.push('Please review and confirm availability and quotation.')
  return lines.join('\n')
}

export function buildProductMessage(product, lines) {
  const out = ['BROTHERS CLUB CLOTHING', 'PRODUCT ENQUIRY', '', `Product: ${product.name}`, `Code: ${product.code}`, '']
  const filled = lines.filter((l) => l.qty > 0)
  if (filled.length === 0) {
    out.push(`I am interested in this product. Please share availability, colours and wholesale pricing (MOQ ${product.moq} pcs).`)
    return out.join('\n')
  }
  const colours = [...new Set(filled.map((l) => l.colour))]
  for (const c of colours) {
    out.push(`Colour: ${c}`)
    filled.filter((l) => l.colour === c).forEach((l) => out.push(`${l.size}: ${l.qty} pcs`))
    out.push('')
  }
  out.push(`TOTAL QUANTITY: ${filled.reduce((a, l) => a + l.qty, 0)} PCS`, '', 'Please confirm availability and quotation.')
  return out.join('\n')
}

export function waLink(number, message) {
  const base = `https://wa.me/${number.replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function formatDate(iso, withTime = false) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso))
}

export const nf = new Intl.NumberFormat('en-IN')