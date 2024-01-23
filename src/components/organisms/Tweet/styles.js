import styled from "styled-components"
import { colors } from "../../../styles/colors"


export const TweetContainer = styled.article`
  margin-top: 0.75rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.dark_gray};
  width: 100%;
  gap: 0.25rem;
  cursor: pointer;
`

export const AditionalInfoContainer = styled.div`
display: flex;
gap: .75rem;
width: 100%;

.icon {
  width:2.5rem;
  display: flex;
  justify-content: flex-end
}
`
export const MainInfoContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  `

export const BodyContainer = styled.div`
  padding-bottom: 0.75rem;
  width: 100%;
`