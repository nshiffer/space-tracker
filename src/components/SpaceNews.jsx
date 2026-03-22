import { useState, useEffect } from 'react'
import { Box, Flex, Text, Image, Spinner } from '@chakra-ui/react'

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
      <Box py={8} textAlign="center">
        <Spinner size="md" color="blue.400" />
      </Box>
    )
  }

  if (articles.length === 0) return null

  const displayed = expanded ? articles : articles.slice(0, 3)

  return (
    <Box mb={8}>
      <Flex align="center" gap={2} mb={4}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
        <Text fontFamily="'Space Grotesk', sans-serif" fontSize="16px" fontWeight="600" color="gray.200">
          Space News
        </Text>
      </Flex>

      <Flex direction="column" gap={3}>
        {displayed.map((article) => (
          <Box
            key={article.id}
            as="a"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            display="flex"
            gap={4}
            p={4}
            bg="gray.800"
            borderWidth="1px"
            borderColor="gray.700"
            borderRadius="lg"
            textDecoration="none"
            transition="all 0.2s"
            _hover={{ borderColor: 'blue.500', transform: 'translateX(4px)' }}
            alignItems="center"
          >
            {article.image_url && (
              <Box w="80px" h="60px" borderRadius="md" overflow="hidden" flexShrink={0} display={{ base: 'none', sm: 'block' }}>
                <Image src={article.image_url} alt="" w="100%" h="100%" objectFit="cover" loading="lazy" />
              </Box>
            )}
            <Box flex={1} minW={0}>
              <Text fontSize="14px" fontWeight="600" color="gray.100" noOfLines={2} mb={1}>
                {article.title}
              </Text>
              <Flex gap={3} fontSize="12px" color="gray.500">
                <Text>{article.news_site}</Text>
                <Text>
                  {new Date(article.published_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric',
                  })}
                </Text>
              </Flex>
            </Box>
            <Box color="gray.500" flexShrink={0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7,7 17,7 17,17" />
              </svg>
            </Box>
          </Box>
        ))}
      </Flex>

      {articles.length > 3 && (
        <Box textAlign="center" mt={3}>
          <Box
            as="button"
            onClick={() => setExpanded(!expanded)}
            color="blue.400"
            bg="transparent"
            border="none"
            cursor="pointer"
            fontSize="14px"
            fontWeight="500"
            _hover={{ color: 'blue.300' }}
          >
            {expanded ? 'Show less' : `Show ${articles.length - 3} more articles`}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SpaceNews
