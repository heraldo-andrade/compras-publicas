import { FlexContainer } from "@uigovpe/components";
import Image from "next/image";

export const Footer = () => {

    return (
        <FlexContainer
          direction="row"
          gap="12"
          justify="end"
          align="center"
          className="p-8"
        >
          <div>
            <Image
              src="/images/logos/logo-govpe.png"
              width={120}
              height={51}
              alt="Farmácia Digital"
              className="rounded"
            />
          </div>
          <div>
            <Image
              src="/images/logos/logo-liga-digital.svg"
              width={120}
              height={51}
              alt="Secretaria de Educação e Esportes"
              className="rounded"
            />
          </div>
        </FlexContainer>
    );
}