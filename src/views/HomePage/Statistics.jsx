import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAppSelector } from '../../reduxs/hooks';

function StatsCard(props) {
  const { title, stat } = props
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  )
}

export default function Statistics() {
  const { titleI18n } = useAppSelector((state) => state.account);
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        {titleI18n["what_is_our_company_doing"]}
      </chakra.h1>
      {console.log('titleI18n[]',titleI18n['people'])}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={titleI18n["we_serve"]} stat={'50,000 '+ titleI18n['people']} />
        <StatsCard title={titleI18n["in"]} stat={'30 ' + titleI18n['different_countries']} />
        <StatsCard title={titleI18n['who_speak']} stat={'100 ' + titleI18n["different_languages"]} />
      </SimpleGrid>
    </Box>
  )
}