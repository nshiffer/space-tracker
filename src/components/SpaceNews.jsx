import { useState, useEffect } from 'react'
import { Card } from 'pixel-retroui'
import { theme } from '../theme'

const NEWS_API = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=6'

function SpaceNews() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    fetch(NEWS_API)
      .then((r) => r.json())
      .then((data) => setArticles(data.results || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-8 text-center">
        <span className="font-pixel text-[10px] blink" style={{ color: theme.green }}>
          LOADING TRANSMISSIONS...
        </span>
      </div>
    )
  }

  if (articles.length === 0) return null

  const displayed = expanded ? articles : articles.slice(0, 3)

  return (
    <div className="mb-8">
      <h3 className="font-pixel text-[10px] mb-4 glow-blue" style={{ color: theme.blue }}>
        &gt; SPACE TRANSMISSIONS
      </h3>

      <div className="flex flex-col gap-3">
        {displayed.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline block retro-card"
          >
            <Card
              bg={theme.panel}
              textColor={theme.text}
              borderColor={theme.border}
              shadowColor="transparent"
              className="overflow-hidden"
            >
              <div className="flex gap-3 p-3 items-center">
                {article.image_url && (
                  <div
                    className="w-[72px] h-[54px] overflow-hidden shrink-0 hidden sm:block"
                    style={{ border: `1px solid ${theme.border}` }}
                  >
                    <img src={article.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-retro text-lg line-clamp-2 mb-1" style={{ color: theme.text }}>
                    {article.title}
                  </p>
                  <div className="flex gap-3 font-retro text-base" style={{ color: theme.muted }}>
                    <span style={{ color: theme.purple }}>{article.news_site}</span>
                    <span>
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <span className="font-pixel text-[8px] shrink-0" style={{ color: theme.muted }}>
                  &gt;&gt;
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>

      {articles.length > 3 && (
        <div className="text-center mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-pixel text-[10px] bg-transparent border-none cursor-pointer transition-colors hover:underline"
            style={{ color: theme.blue }}
          >
            {expanded ? '[ SHOW LESS ]' : `[ +${articles.length - 3} MORE ]`}
          </button>
        </div>
      )}
    </div>
  )
}

export default SpaceNews
