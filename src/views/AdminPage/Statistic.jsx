
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

export default function BasicStatistics(props) {
  const {totalAccount, totalContact, totalSession} = props
  const { titleI18n } = useAppSelector((state) => state.account);

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
      {titleI18n['what_is_our_company_doing']}
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={titleI18n['we_have']} stat={totalAccount+' '+titleI18n['accounts']} />
        <StatsCard title={titleI18n['have']} stat={totalContact+' '+titleI18n['contacts']} />
        <StatsCard title={titleI18n['and']} stat={totalSession+' '+titleI18n['session_is_running']} />
      </SimpleGrid>
    </Box>
  )
}