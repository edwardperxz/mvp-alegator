import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/ivan-lentes-fondo-transparente.png';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../supabaseClient'; 

const schema = z.object({
  userName: z.string().min(2, 'Usuario incorrecto'),
  password: z.string().min(8, "Contraseña incorrecta")
});

type FormFields = z.infer<typeof schema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormFields) => {
    try {
      console.log("Iniciando sesión con:", data.userName);

      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('username', data.userName.toLowerCase());

      if (fetchError) {
        console.error("Error al buscar usuario:", fetchError.message);
        return;
      }

      console.log("Resultado de la consulta:", users);
      if (users.length === 0) {
        console.error("Usuario no encontrado:", 'No se encontró el usuario');
        return;
      } else if (users.length > 1) {
        console.error("Se encontraron múltiples usuarios:", users);
        return;
      }

      const user = users[0];

      const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: data.password
      });

      if (loginError) {
        console.error("Error de inicio de sesión:", loginError.message);
      } else {
        console.log("Inicio de sesión exitoso", authData);
        setIsLoggedIn(true);
        navigate('/home');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Error desconocido:", error);
      }
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
            <input {...register("userName")} type="text" id="username" placeholder="Nombre de Usuario" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
            {errors.userName && <div className="text-red-500">{errors.userName.message}</div>}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input {...register("password")} type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
            {errors.password && <div className="text-red-500">{errors.password.message}</div>}
          </div>
          <button disabled={isSubmitting} type="submit" className="w-full bg-[#6B9026] text-white py-3 md:py-4 rounded-full hover:bg-[#507A1B] transition-colors text-lg">INGRESAR</button>
        </form>
        <div className="mt-12 text-center text-white">
          ¿No tienes una cuenta? <div><Link to="/signup" className="text-yellow-400 hover:underline text-xl">REGÍSTRATE</Link></div>
        </div>
        {isLoggedIn && <div className="mt-4 text-green-500">Sesión iniciada</div>}
      </div>
    </div>
  );
};

export default Login;