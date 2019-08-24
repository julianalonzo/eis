import React from 'react';

import { storiesOf } from '@storybook/react';

import Item from '../components/Item';

export const item = {
  id: '62a6da12-7463-49ad-a47f-3126d8cb5c0a',
  thumbnail:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUXFRUXFRUVFxUVFRUWFxcVFRgYHiggGBolGxYVITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OGxAQGi4lHyUtLi0tLy0tNS0tLS0tLTAtLy0tLS0tLS0tLS0rLS0rLS0rLSstLS0tLS0tLS0tLSstLf/AABEIANgA6QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAcGBQj/xABNEAABAwEEAwkMBwYFBAMAAAABAAIDEQQSITEFE0EGFCJRYXGRktEHFiMyQlJTcoGhsbIVJDNic8HwVJOiwtLhCIKz0/E0Y2TiJUSj/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwQFBv/EAC4RAAIBAgQDBwMFAAAAAAAAAAABAgMRBBIhMUFRoQUTFBVSYeEigfAjMkJxkf/aAAwDAQACEQMRAD8A83u07r9IQaRfBHO+KJscZjDTQEOaC5x4zevCvIuf3huhPCpaDXGt9m32rq/8SmiqSWW1AeM18Lz6hvsH8UnQur3BaQ1+j7NJWp1QY6ud6KsZJ57tfas4JPc34elGo2mZXvLdFxWnrs7Uhse6L/yeu3tW6JHMUbimdXg4c2YVvfdD/wCT129qid9PDN1o67e1bhKymK5y3S0K66GGVV6MyjgoN7szAv0751o67e1MdaNODN9o6ze1aFvpNearZUwOTcxlg4riZ7vvTfpJ+s3tRv3TfpJ+s3tXcvao1yypxWzOadGMTit+ab9JP1m9qTf2mvSz9Ydq7i6mFixyI5bnE7/016WfrBRx6W0w4VE05B23gu3fGCKEVVZ1nDakDgmlfu0AHRQD9ZZqnF7XuE+Zyn0npj0s/WHam/SmmPTT9YLqy1Mc1Tu0bGkct9K6Y9NP1gj6V0x6afrBdIWpCFkqKZqlNI5w6W0x6afrBM+mtLZ6+brBdE4qlIaHkPxXVTwUZbtnDVxkovRI8k6c0t6ebrBNO6DSv7RN1gvQkcoHLJ4CC4swWOm+CKh3SaUH/wBibrBN75tJ/tM3WU8kXxCglZXYsXgorizdHFNh3z6T/aZusjvn0n+0zdZRCozTduKx8HHmzNV5E/fPpP8AaZusmu3SaR22ibrJiHDatM8MomUa9z29ye7nSbbXBGLTI69NEwscah154bdI21qvqpfLPcV0ZvjS8JIq2EPnd/lFG/xuYvqZch0mf93LRWv0TK4CroHMmb/lN1/8D3H2Lhu4dpIOss0JdjFKHAHY2Vuzj4THdK27S9hbaIJYHeLLG+M8z2lp+K+Zu5NaDBb5LPJwS9j2EcUkRve4NeFspaySZvwztURuzZAU4qgx9NtVKLQFjiKFtYnrTjbYdO0ELlNNw0rR7Rzkj8l00koXPaYYHVXT2ZVcZ2ZKbexyErn1wLTzPaT0VqvQsb3U4QIPKKLxdJ6OcDUZK7oiVzRQk8xyXt123BmttnrOaoixSh1UoavnpXvqebVlqRtalLFKGJbqKRxzTvcqOYoiFbe1QSLNBPmUXx0yyOXIeLm/XEmEKeRV6/rj5Vs/crmSdvp/wa9iiU5KqyPxPLRdVCnm0ODEVshFLngqs0dQrTlG8r0oU7I8qVRtlAx1SatWSMedNLVn3ZnnKsjVGY1YmFAmQEEKOBti9LlKaMcyqSkVoCvRt0Ic0itOZedPGMNmGzAe1apQszroyTQ6E1TLabrHHkp04Is5xUemn0a0cZr0f8rmxMctNyNkV+oka7/hr0Vha7URmWQsPNw3j3xdC29cR3GdF730TZ6ijpQ6Z3LrDVp6gYu3Xhnogvlzd9Z94aekeOC0zNmB+5NR0lPa6QexfUawX/EnoqktltQHjsfC88rDfZXlN9/VVjJxaaKnZ3R7lit5rSq9B8m0FcFuVtEkkLHEE1aMc+Q++q6iG0upQgr18Y4u04Htusmro9E2pUrTNVRPkVd7iuBNJ3Rpc+RHOAdipiChwXoNZtOAGZSQlj8j009y3KvOztqjnniYrciiYrQYnRhvnNwzxGCsRhpyIK53GTTdjzquIg5rUrXUFqtGJRPatCTuJ1I2KsgVOVXpFRnXQlY54yuVZAqz8COXD8+1TySKm+SruQLup0W7v2/Opy1MSr29x73UCpPdj0/kpppFUriehd+Fp2WpwYipnndcBSU0pSmOcuyxoSGTHI8qRzk2d2HR8Uy8htUdBJsS0coRIyhvAUO2m0dqR5y9YfFPKwauzZskQy5LzrYagdHRgr0xwVC1Z0GQHSTiSsJHRRRWjOKjlgdPaI4WeM9zI2+s9wA97gpAul7jWjd86YhJFWxX53f5BRh67mLzO0J2pqPNnoUY3lc+oLFZmxRsiYKNjY1jRxNaA0DoCmQheOdQLPu7rorX6JkcBV0D45hzA3H+wNe4+xaCqembA20WeaB3iyxPjPM9pbX3oD5C0PLKW3WOIunIOpnjlXnXv2G2WuoBc8iuOOznXL2GN7JHxEEOBIcOJzTQg+9dZoqy2nyQKcRqPgvdwss9FX4aHXRgpLY9aK2WjO9IOSoNPcvQsr5XZyP6f7BS6Ngl8tn65wMPaCuhsliadnsK1YitCmv2m2dOlFXlHoeRHo8upfe9w4iTT3k09mKmtsWFKZtIwzpVoqOYE9K93ewAwVd1jq4HHDZszrVeT4huacuBoi4vbRHlWewSYUkAHJG3DkYdntBVueAtbeBJc0VxxJpiR7eLmXpCIBU7Q6rXEcoHs+GK6sM5Slnen26Hl42tn/TXH8v9ufAijtIcKpkj1Rh4LgAc2g+8jDkwVqRwAxIC78RShB/SjxcPVnPST24kMxVGd1FJaLUNlT8OleXaJCcz7Fro4SU3eR01cXGCyxK0jy4nYKnnz/5UdEr3KJzl7HdaWPNbu9BJXUCjyTS+prsGXLyprnLKKsbFG2g4lRucopJtgxPw51ASRiTtx9qNm2NMktLsP1sxUYeoZpK/r3/rjTb61uWpvUNCw51S0feHxqpZHKpAau9UV9pwH59Cle7HmUvuyuOyGzcvRtPYqT/jirL1A5Ys2w0Kc5o0nkWt/wCGvRWFrtRHmQsP8cg/0lkOk3UaBxn3D9BfS/cX0VvfRNnqKOmvTO5dYeAeoGLxO0JXqKPJHo4dfTc7hCELgN4IQhAfMG7TRwsu6CRpbwJZ2vHERaQC48we93VWj2TRgbs9yh7um5FkxjtwnijexoiLJC8ayhc9mruAm+KuwpljUUWOau0+kf8AvZO1Vznlyp6G2FVxVkb0yzAbEsQF4gbB8x/9SsELLT6V/wC9k7VCHWnY6T98f61rULa31HeJrU+hyxMc1fPLrRafOl/euP8AMk3zaPOm/eP/AKlVBGpts3y0uNMF4oZmCcCcq4n2ZrHNfaOOX94/+pIZpzmZf3j/AOpejSxvdxyxieZV7O72WaUvY2p9wjIEDLAFefaJ2jID2CiyTWTf9zru7Ul6bik67u1SOKgpXab+4lgqrjljNL7fJpFptFV500y4bwvmv6x7UrGvrwmvpyEn4ld0e1YRVlDr8HPHshp3c+nydZJaFC607Fzhj+7J+v8AMmPjdsY/2n+6j7XT/h1+DeuzUv5HvSy0INaY5bCKY/kh0xPIueMT/Md0ntS6t/mO6T2rHzVenqZ+A9z3r4CZI/DFeJq3+Y7pPak1b/Md0ntU80Xp6lWC9z0y6uKZfxoBUnIBefqn+Yen+6BE8ZMd0/3WPma9PU2LC+57sbLrabcyeM9gTF42rk8x3Se1P3tL5h64/qV8zXp6mHg3vmPSeVESqzLBIRWgHO4/knfRsnEOsVPMl6epksLbiQz2d008UDPGe5rG+tI4AfEL7HsFlbDFHEwUbGxrGjiaxoaPcF8/dx7cW2e2R2mSaIb3drNQL5lc5uDHG8AAwOLTUF2QGFV9ELzatTvJuXM64RyxSBCELWZAhCEBk/dnq6azt2CN5A5XOAJ/hHQs5NlWld14fWIfwj85XCDmVIecbIk3qvUaKqidOWcEtuyEg0yZiQacapCDeqTeyuP0pEBUxTAZgkMoebhYoj0pC4VEUxAFSQGYDjPCQpT3sje6ts0rCTQRyk5UozM5eUkOloBgY5f/AM/6lAVd7pN7q7JpKJoBdFMARUEhmIGFRwlYsLxMKxWed45NVsoNr+UKpXIeXvdG91cl0jE1jXuimDXXg11GUJbdveVhS83PjS2fSEUlLkUzq1phHsrXN3IehbHRqJXcXb+g2k7Mpb3RvdeuTQNcYJQHm62r7OLzuIAyVrhxKMzNqW6ierQSR4M0AzycsckuQujzN7o3urh0lEK1im4N69gzC7W9XhbKHoUrbUwtviCe7dDq0jpdNKHxvvN6UcJJXaIpJ7M87e6N7qyzS8BBIjlIBAJoygJqQPG5D0J79JRClYphUAioYKg5EcLEcqxMinvZG9ledpCMAOMM4aciWsAOJGBrjiCMOIoGkI7t/Uz3a0vXWXa4YVvUriMOUKApb2S71VuPSMTq3YpjQVNAzAcfjKCTT1nBoWS9DP6lQMFkThZFfjka5rXNrRzQ4VpWhFcUHmUIev3OmlmkbORhUvB5QYn4H3H2LeFhu4Mf/IWf1nf6b1uSMqBCEKFBCEIDL+603w8P4R+Yrhgxd53Vh4eH8M/MVxAaqQbGzELhZxFfe4NkweT9tGPK2Ax1PNitAjbiFwNpsnDf4WLxnbXed6uHsVQLRe1zWAvm4YPBMkdBw3MoPB/dzwRZ9WGuuvmAa0YX48QXBtD4PlUIs1dUGywkgULSXUJMr3AYtoQQ4DpUrLCQ2UGSIF1AAC6mDwSPF4ggHRxMvM4Uo1hFDrIjhW7Wmrw9yR9x15xdKbpxN+KuOFfs8T0oisJDoSXxANIJIcSXASElxozPAtx81MGjnUko+E1pwi51W8OtRwK45YcaAllDHatt6U32gAX4h5bmAV1eWGfKpLJaAxhuSztEZN0B8eBk4LsdXyKHeDiYQHwuLQAWuL6OdrXuungioIcB0pG2I3ZRrIgXFt0AuoKOJIrdyosk2tiF21Wt05jjmlncHkUq+E4PLW1wi/7bcD5oVOO0tDC0STBnBJbrIhWhJaaavGhJy406KxFskLi6FobqyaOcbwa8kvNG+MaUp91QQ6NcI3i9CfE4d51WUJ8Xg+Vt5lc8suW7ty4Bq7u9z1Bb3F0QEkjnEAsrvckEucMC6HjrjXCuxV22uofJrZ64NPDj4QfWoPgssFC6wkuhuyROIaxpaS6jnX3G6atoQagKOKwkRvaZYqksIxd5N6vk8oTPLmwizBMCRHrZqSvBd4SJ2L6tJPg+InDlUTbWLhbrJ7tA2msjyzA+yy4PuTorERJC5zoWBojJuucbwa6peaN8Y/kq8WjnCN4vQnFgv3nVb4xo3g1xp7uiZnzKtNiURRso1rpuGGupfjpeNQM4+U48pSmRjm3i+Y3Sxgq+M0BDyAKx4AXThyp4sZMkVHQvoxrS1xcAXUIpi2m1VmWA6tzdbFUvjIxfk1soPk/fb71iC1G9ryyMyzluF0ayJwaDU4DV0GJOGGZTGWkXCBJOGEirdbHdJORu6vE8HOmwcibY9HuZIxzpIgBQ4OeaimByzKrt0W+6fCQ4FoJvPqCQ6gGGRodnk7EBNPaRGaNdNRzGk+EjFQ4B1PssRkqEhjcalspP4rP9pX7Ro1z3MDZIibjG+M4YtaAc28ijihjDQDqnHGrtdIK1JpgGYUFOhUHV6PaNTFdBA1bKAmppTaaCvQFMWJNGx0hiFQaRsxGRwzHIpy1Qh624Vv1+z+s7/TcttWL7hx9fg9Z3yOW0KMqBCEKFBCEIDNe6oPDQ/hn5iuJAXb91L7aL8M/MVxYCpBYxis7tdnILjjevuBZckqBedjWl0jAZHatHjGIWfTPnc4luuIvOFQZCCb525bQMOLjVQK9iifrI+A7x2eSfOClkcRrWmJxcTwHUcLtH8LCmNRhyKKW0TNNHOlaeIueDjyFW/pB9IQZXAFuLi5xoDPKCTjjQD3KgY4ubqS6JzhcNWkObXw02FRiMKHoSx3yyciNzRwSBRxoDJgK0xoNqli0g+5N4RxoG4hxofCAVCWzW92shpMXXnMqKngkvpdOP6qgIbI5xlhpE5tHRB2DjU38XZYc3Iq7XODXtMTi4lt13CFyhN7CmNRhyKyNIOIeTM4FpFG1NX1JBpjszUkmkXnUgyuaHMxdVxujXSNvUrjQD3ICGe+3UExuIuAlpDhUa2Soryj4pIGyaqU3HZx+SeNymg0k/VSm+7Ax+UdripLLb3CWACYuvOiJoTwS54BYcf1VAVrBfM0NI3Cj4waB2PhMXGuWFOTBVonODCDE8uN2h4Qu08aopjXLkViHSLyxzjMQRdo0lxL7xxoeTPFWZ9IPJhBlcL0bakuNBV7hU4oCC1h4MJMbiNWwkUcKi86orTDBRxNk1MnAdg+LyT5sv9ulTxaSk1Uhvu8eLyjtEnYpbHb3a6ECYuvGMmhIoXEVYccaZICGwlzpobsTm0MYd4xvOB4T8sK8XIqjHuuXdU68SDeo6oAGVO1TM0k8tJ1pzaKXjUgg457KDpVq06QkvRAOcaxx4XjjXYgI5b4kiJa4eDjNbpzDebjVeNsmpfwHfaReSfMm/t0hTs0nJqnnWO+0i8o7WzH+UdCk0fpJ5ljF92zyya4frDYgGWIPM0fBccGg8E4UZSmXIvPYx1wi67xmml040D8ctlfegW2Sn2j+u7tUzH2hwvNMxHGNYRt2jmPQgO40UwiCGoIOrZgcDkrBCi0S4ughJJJMTMSak4bTtVghQh7G4kfXoPWd8jlsqx3cUPr0HrO+Ry2JRlQIQhQoIQhAZx3UPtovwz8xXGALtO6f9tF+GfmK4wBUg6MYrObTaxfeNUyl92F+cDxjsEtOhaRGMQs8tRiq9l/yn8Le7S7xyfG1leTmVQKhtDTnDGed0/wDuqeG0Me6JjoIqAtYKGYG655Jx1mJq5xqa5pkljiAade43mlwpDkA5zcaycbTkprJY42kSGV9I9XIRqRVzb4Au+EIz41SEoljAka2Bl3AO4UmQfwc31zpknRuia6EsgbfdRzeFKeGJXtbQF9M2jDjVeOzRvcQ2eQB72txjAFXON28BLjt2HIps7IeABNJWNpbXVDE6yR94eEqPHp7EKWG6ktkcYGVaW5PlpVzqHJ9OhPjfE98LHwMpwGijpAQx7q7H58MnHHEbE1ljY2KW/LIC9sTwTEKlrnmjh4Q1rQ5kKtZjE2SN7ppXCNzCBqhk1wddFZcB2oCaGdlx9LOy6bl/hSmmJu4l9RjXJTRasPhMdnYXkB7RelPCD3UPCfTyQcV5ohiGAmkp+CMaZV8Kp5nRHV3ZpWljA2uqANbznVBEuHjU9iAmYILj3ahgLSwUvTCl4urhf5FMDG6SFklnaA4RtbwpRWNzqAgh+OZxKpR6kMe0yyEvLDXVNwul1a+ExreRZTE2SN7ppXCNzDTVDJjr10VlwHagLEMjdU8izsuEtLzWWgIwbiX1Hj+2qkY+GN8TmxRtJax15zpSA4k4mrzhhxLzWxRAXdfJTi1QoeUjWr0LZY4yGPEjyGQxFx1IIF5zg29WQZnCmKAiYYNW52oZUOY0cKbJwkJ8v7gU7HwySRNdFG4UY3B0oo3Y08PEiueKrWOzwvGpEzw6SSOhMQoC0SNoaSE46z3JLI2GN8cjpHkCjgBEwVANPSYYjbxFASR2iHVuGqjxcw3ay1JAfQg36ilT1kk1oZE9jo4YwbjHVJmdi5tTgZKUxUMtkjYA3XuIc1j8IeQ0rWTOjipLTFC9oeJngMbFGQYQSTcdQiklKcB21AVNcz0EfWn/AN1OFpbSmqZTivWin+qpYdHsc9rNc9pcARehoKEXgcJDgQiB0TQRfvVxq6zNcRzVlwQHd6KNYISAGjVMwFaDDIVJNOcqwQoNEtAghDSXARMoSKE4ZkY0VkhQh6+4sfXoPWd8jlsKyDcZ/wBbD6zvkctfUZUCEIUKCEIQGd901tZovwz8xXHCM8S7XujDw0X4Z+YrlQFSEEbDXJZxa9ETXjSJ9bz73i08Y3btDxca1ABOAVIZk7REpEV+OSgjINy4SDrpXUNXCmDgfanN0TKGShkUmLGYPuAl2taTShxFAtMATgEuUzOz6JeHsLY5/tIybwja2ge0kmjjlj0KL6HfjeinrV3iiMtzNKEu4qLUgEjGYBLgzP6Ll1cobHKeDGAH3A4kSEkNAccAKe9Ufoa0+hd7u1a5cHEluBLgyL6GtPoXe7tR9DWn0L/d2rXrgRcCXIZD9DWn0L/d2o+hrT6F/u7Vr1wcSLgS4Mh+hrT6F3u7Vfn0VLRgdHLTVRijLhxBdUOq4ZVC0+4EmrCXBmVi0Q8SxlscwpI0kvEbWhoJJNQ445e9Vm6HkuAGKe8G5Ujuh3EOFWldq1a4ElwJcpl1r0ZaL0ZEJdSOOoIa4VAxa4Vx5lHDoq0iJ9IjUyRUBukkNbMCaHlc3pWqNH5/FBCXBmOjtHTiVhMbg3yiWxtobprkcq7dvEMlSboq03aak5g1o2uAIpWuWOS1khNIS5DyNEwObBC1woRGwEcRAxCsmM8SuEJpCAu7jWnfsPrO+Ry11ZVuTH1yH1j8jlqqjKgQhChQQhCA4HuiDw0f4Z+YrlgF1fdCHho/wz8xXLgKkEATgE4BOAVINDU4NTg1ODUAwNQxuA5gpQ1EbcBzBANupbqfdS3UBHdS3VJdRdQEd1F1SURRAR3Ul1S3UXUBDdSXVNdSXUBA1vxPxKC1SNb8T8SgtQEJamlqmLU0tQEJCaQpi1MIQHoblB9ch9Y/I5amsv3LD63D6x+Ry1BRlQIQhQoIQhAcLu/Hho/wz8xXMgLqN3v20f4f8xXNgKkEATwEAJ4CpBAE4BKAnAIBAEkYwHMFIAkjGA5ggEolon0RRANoiifRFEAyiKJ9EUQDKJKKSiSiAZRJRSUSUQETR8T8SghPaPifiUEICIhNIUpCaQgISE0hTEJhCAvbmB9bh9Y/I5aas03Mj61F6x+Vy0tRlQIQhQoIQhAcRu8+1j/D/mK5sLpd3o8LGeNh9zv7hcyCqQkCeFGCngqkHhOCYCnAoB4SR5DmCAUkZwHMEA9CSqWqAVCSqKoBUJEVQCoSVRVACEiKoBrfzPxKUpGn4n4lBKAQppSkpCUA0phTiUwlAejua/6qL1j8rlpKzbcyK2qLnd7mOWkqMqBCEKFBCEIChpfRUdoaGvBwxa4YFp5OTkXMzbjXg8CQEco7EIQEfehN57eg9qXvRm89vQe1CEAvelN57eg9qXvTm89vQe1CEAvepN57eg9qTvSl85nQhCAO9OXzmdCO9OXjZ0JUIBDuSl85nVUY3Hz+kb1AhCAO9Cf0jeqEd6E/pG9QIQgHs3JTAYvYeW7T4Je9OXjZ0JUIBO9OXjZ0I70peNnQhCAXvUm85vQe1J3qTee3oPalQgE705vPb0HtSd6U3nt6D2oQgE70ZvPb0HtQ3cdLXF7ej+6VCA9/Qm5+Ozm8KueRS8dg2ho2L2EIQAhCEB//2Q==',
  name: 'MBP-01',
  category: 'Laptop',
  condition: 'Working'
};

storiesOf('Item', module).add('default', () => <Item item={item} />);
