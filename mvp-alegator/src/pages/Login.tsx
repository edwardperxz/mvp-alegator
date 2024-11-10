import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/alegator-logo-footer.png';
import { createClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const schema = z.object({
  userName: z.string().min(2, 'Usuario incorrecto'),
  password: z.string().min(8, "Contraseña incorrecta")
});

type FormFields = z.infer<typeof schema>;

const Login: React.FC = () => {  
    
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<FormFields>({
      resolver: zodResolver(schema)
    });
  
    const onSubmit = async (data: FormFields) => {
      try { //encontrar el correo del usuario
        const { data:users , error: fetchError } = await supabase
        .from('users')
        .select('email')
        .eq('username', data.userName)
        .single();

        if (fetchError || !users) {
          console.error("Usuario no encontrado:", fetchError.message);
          return;
        }
        
        //autenticar usuario con el correo 

        const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
          email: users.email,
          password: data.password
        });

        if (loginError) {
          console.error("Error de inicio de sesión:", loginError.message);
          
        } else {
          console.log("Inicio de sesión exitoso", authData);
          
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
          
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="relative flex justify-center z-10">
        <img src={logo} alt="Alegator" className="h-36 md:h-48 lg:h-60 -mb-20 md:-mb-24 lg:-mb-24" />
      </div>
      <div className="bg-[#11372A] p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative z-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center">INICIO DE SESIÓN</h2>
        <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="sr-only">Nombre de Usuario</label>
            <input {...register("userName")} type="text" id="username" placeholder="Nombre de Usuario" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B] " />
            {errors.userName && <div className="text-red-500">{errors.userName.message}</div>}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input {...register("password")} type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B] " />
            {errors.password && <div className="text-red-500">{errors.password.message}</div>}
          </div>
          <button disabled={isSubmitting} type="submit" className="w-full bg-[#6B9026] text-white py-3 md:py-4 rounded-full hover:bg-[#507A1B] transition-colors text-lg">INGRESAR</button>
        </form>
        <div className="mt-12 text-center text-white">
          ¿No tienes una cuenta? <div><Link to="/signup" className="text-yellow-400 hover:underline text-xl">REGÍSTRATE</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;