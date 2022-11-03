import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExample from '../assets/users-avatar-example.png'
import imgChcek from '../assets/icon-check.svg'
import Image from 'next/image'
import { apiConnect } from '../axios'
import { FormEvent, useState } from 'react'

interface HomeProps{
  poolCount: number
  guessesCount: number
  usersCount: number
}

export default function Home(props: HomeProps) {

  const [poolName, setPoolName] = useState("");

  async function createPool(e: FormEvent){
    e.preventDefault();

    try{
      const res = await apiConnect.post("/pools", {
        title: poolName
      })
      const { code } = res.data;
      alert("Bolao Criado, divirta-se!")
      setPoolName('')
      await navigator.clipboard.writeText(code)
      
    }catch(err){
      console.log(err)
      alert("Falha ao criar, tente novamente")
    }
  }

  
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='' />
        <h1 className='text-white-700 mt-14 text-5xl font-bold leading-tight'>Crie seu Proprio Bolão da Copa e compartilhe entre amigos</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExample} alt='' />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form className='mt-10 gap-2' onSubmit={createPool}>
          <input type='text' required placeholder='Qual o nome do seu bolao' onChange={(e) => setPoolName(e.target.value)} value={poolName} className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-white-700 text-sm' />
          <button type='submit' className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'>Criar Bolão</button>
        </form>

        <p className='mt-4 text-gray-300 text-sm leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outros amigos para participar</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between'>
          <div className='flex items-center gap-6'>
            <Image src={imgChcek} alt='' />
            <div className='text-white-700 flex flex-col'>
              <span className='font-bold text-2xl'>
                +{props.poolCount}
              </span> 
              <span> Bolões Criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
          <Image src={imgChcek} alt='' />
            <div className='text-white-700 flex flex-col'>
              <span className='font-bold text-2xl'>
                +{props.guessesCount}
              </span> 
              <span> Palpites Enviados</span>
            </div>          
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="" />
    </div>
  )
}

export const getServerSideProps = async () => {
  
  const [poolCountRes, guessesCountRes, usersCountRes] = await Promise.all([
    apiConnect.get("/pools/count"),
    apiConnect.get("/guesses/count"),
    apiConnect.get("/users/count"),
  ])
  
    return {
    props: {
      poolCount: poolCountRes.data.pools,
      guessesCount: guessesCountRes.data.guesses,
      usersCount: usersCountRes.data.users
    }
  }
}
