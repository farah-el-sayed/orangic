import { useEffect } from 'react'
import { products } from '../data/products.js'
import { journalPosts } from '../data/homeData.js'
import { withBase } from '../utils/withBase.js'

const defaultDescription =
  'Thoughtful organic pantry, wellness, body care, and home goods for everyday living.'

const pageMetadata = {
  '/': { title: 'Orangic | Organic essentials', description: defaultDescription },
  '/products': { title: 'Products | Orangic', description: 'Explore Orangic organic pantry, wellness, body care, and home essentials.' },
  '/categories': { title: 'Categories | Orangic', description: 'Browse Orangic essentials by category and daily ritual.' },
  '/about': { title: 'About Orangic', description: 'Learn how Orangic chooses thoughtful, traceable, low-waste goods.' },
  '/blog': { title: 'Journal | Orangic', description: 'Read thoughtful stories, guides, and ideas for everyday living.' },
  '/contact': { title: 'Contact | Orangic', description: 'Get in touch with the Orangic team.' },
  '/download-app': { title: 'Download the Orangic app', description: 'Take Orangic with you. Download the app for thoughtful shopping on the go.' },
  '/cart': { title: 'Cart | Orangic', description: 'Review the considered goods in your Orangic cart.' },
  '/wishlist': { title: 'Wishlist | Orangic', description: 'View your saved Orangic products.' },
  '/checkout': { title: 'Checkout | Orangic', description: 'Complete your Orangic order.' },
  '/login': { title: 'Sign in | Orangic', description: 'Sign in to your Orangic account.' },
  '/register': { title: 'Create an account | Orangic', description: 'Create your Orangic account.' },
  '/account': { title: 'Account | Orangic', description: 'Access your Orangic account.' },
  '/search': { title: 'Search | Orangic', description: 'Search the Orangic collection.' },
  '/shop': { title: 'Shop | Orangic', description: 'Shop thoughtful everyday goods from Orangic.' },
  '/admin': { title: 'Admin | Orangic', description: 'Orangic administration.' },
}

function metadataForPath(pathname) {
  if (pageMetadata[pathname]) return pageMetadata[pathname]

  const product = products.find((item) => `/products/${item.slug}` === pathname)
  if (product) {
    return {
      title: `${product.name} | Orangic`,
      description: product.description,
      image: product.images[0],
    }
  }

  if (pathname.startsWith('/products/')) {
    return { title: 'Product not found | Orangic', description: 'The requested Orangic product could not be found.' }
  }

  const post = journalPosts.find((item) => `/blog/${item.slug}` === pathname)
  if (post) {
    return {
      title: `${post.title} | Orangic Journal`,
      description: `${post.category}: ${post.title}`,
      image: post.image,
    }
  }

  return { title: 'Page not found | Orangic', description: 'The requested Orangic page could not be found.' }
}

function setMeta(name, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function PageMetadata({ pathname }) {
  useEffect(() => {
    const metadata = metadataForPath(pathname)
    const canonicalUrl = `${window.location.origin}${pathname}`

    document.title = metadata.title
    setMeta('description', metadata.description)
    setMeta('og:title', metadata.title, 'property')
    setMeta('og:description', metadata.description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('og:site_name', 'Orangic', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', metadata.title)
    setMeta('twitter:description', metadata.description)

    if (metadata.image) {
      const absoluteImage = /^(https?:|data:|blob:)/i.test(metadata.image)
        ? metadata.image
        : `${window.location.origin}${withBase(metadata.image)}`
      setMeta('og:image', absoluteImage, 'property')
      setMeta('twitter:image', absoluteImage)
    }

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [pathname])

  return null
}