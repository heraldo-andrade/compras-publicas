'use client'

import { Button, Card, FlexContainer, InputMask, InputPassword, TextLink, Typography } from "@uigovpe/components";
import styles from "./index.module.scss"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from "react";
import { cpfSchema } from "@/app/infrastructure/validations/cpf";
import { passwordSchema } from "@/app/infrastructure/validations/password";

const loginSchema = z.object({
  cpf: cpfSchema,
  senha: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true)
    console.log(data);
    
    // Realizar autenticação
    setTimeout(() => {
      setIsLoading(false)
      router.push('/home')
    }, 2000);
  };

  return (
    <section className={styles.login}>
      <div className={styles.loginContainer}>
        <div className="p-8 max-w-[29rem] m-auto w-full">

            <div className="m-auto mb-8 max-w-[25rem]">
              <Image
                src="/images/logos/logo-govpe.png"
                width={120}
                height={51}
                alt="Logo do Governo de Pernambuco. Estado de Mudança"
                className="m-auto"
              />
            </div>

          <Card title="Login" className={styles.loginCard}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FlexContainer
                direction="col"
                gap="4"
                justify="center"
                align="start"
              >
                <div className="w-full flex-1">
                  <Controller
                    name="cpf"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        label="CPF"
                        placeholder="000.000.000-00"
                        mask="999.999.999-99"
                        invalid={!!errors.cpf}
                        suportText={errors.cpf?.message}
                      />
                    )}
                  />
                </div>

                <div className="w-full flex-1">
                  <Controller
                    name="senha"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputPassword
                        {...field}
                        label="Senha"
                        placeholder="Digite sua senha"
                        invalid={!!errors.senha}
                        suportText={errors.senha?.message}
                        keyfilter={/^\S+$/}
                      />
                    )}
                  />
                </div>
                
                <div className="w-full flex-1">
                  <Button
                    type="submit"
                    label="Entrar"
                    className={styles.loginButton}
                    loading={isLoading}
                  />
                </div>

              </FlexContainer>

            </form>
          </Card>

          <FlexContainer
            direction="row"
            gap="12"
            justify="center"
            align="center"
            className="mt-10 max-w-96"
          >
            <div>
              <Image
                src="/images/logos/logo-govpe.png"
                width={120}
                height={51}
                alt="Farmácia Digital"
                className="responsive-img rounded"
              />
            </div>
            <div>
              <Image
                src="/images/logos/logo-liga-digital.svg"
                width={120}
                height={51}
                alt="Secretaria de Educação e Esportes"
                className="contrast-img responsive-img rounded"
              />
            </div>
          </FlexContainer>
        </div>
      </div>
    </section>
  );
}
