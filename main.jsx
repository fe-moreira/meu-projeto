import { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard, Calculator, Table2, FileText, Settings, HelpCircle,
  Sun, Moon, Plus, Trash2, ChevronDown, Building2, Check, Save,
  BookText, Receipt, Users, Wallet, UserCog, LineChart,
  DollarSign, TrendingUp, Clock, ClipboardList, Mail, Send, UploadCloud, MessageCircle,
} from "lucide-react";

const LOGO_WM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAABICAYAAADmiVkYAAAcnElEQVR42u1deZhcRbX/3ds9k42QEBQCBEICihC2iCwKIsgDAgF5yvLwKSiK4qeimCCgIiAYNJDgUxGUD1F2VBYRBBQfooAShSh5ISyJ7EtYQzaSmenu8/6o3/n69End7tszCU4mt76vvu6Zrq5bfap+ddY6lYgI+kEpAagC2BXAvQB0UCsB7Avgn2xTAbAhgHkARvLvFMBnAFwFoMx+BMBfAUwE0AOgE8D3AZxinlWUovS7kvaTMdQAJAD+BeBFAIMInBEAvkuACf+3BMBDBFkngMEAzgawHvspsd+/sJ8hbHcigG3YJi2mvigFIOOlZsbyOoCp5rMqgAMAfJjvS+R4XwbQze9UAIwj91NgJwDOBPAc23QTuDMI7KSY+qIUgGwsCoqxBIlytxsA3E3xs8bPphNQFf7/EQAXc/z63akEZgVAB4BlAL7B56iYegiAAw24i1KUApAEgwA4kvrgrvxbxzPVgKYK4B3kisoBU4qpL5s2Q414q+C+EsAspzfOIGALTlmUApAEgRBA5/L1AiOilgHMBvAzxwG/BmBTcsASxdsz2Sbhd48CsLdpIwS36p8VANsDOMHpm0UpyjoLyJIRMbcG0AVgLwDHOw74TQCLDHcbAWCaMfCkAC6lgadsOOBMfqbgvg/ANQagNQBnAXh7YeApyroOSAXK5sYIo2PYma8KtoUEoOWAx1K8VV2yYoxAygHfA+CTbK/f/Tp1SgX3hgRlrRBbi9KfSvIW+yEVEFcB+BiCxbRM8XNbAK8YgCTU9R4C8E5jrLkXwPuNuFkFcBOA/zT9LQSwHYKLRC2zZwD4Fuq+yyqAXQD8H+qul6IUZZ3hkArG9wH4b75XF8XZBGPJ6ZpdAL5qxNgqxdujjdEnIbddabjkJtQ5rUtlBoAnzTg6KN6i4JJFWRc5pOqOfwWwu+Fm8xAiaqpGP4QD4R0I7gr9zjMAJgBYYTjgdwGcajhgD4AdAcwn+Lpp9PmF0TdLAA4D8BsUETxFWYc4pC72jxOMVr87meBRi+ooGlzsTqFttJ+x/J/lgN8B8IJpMwjA+exHuekvAdxjNgdhm8Eo3CBFWUcAqW6O9Qka6ye8ldyvZAD4GwD/awBaBjAXwE/Q6Ab5KoGpBp7FqAcCqBHoQwD2R2MgwBTz/Cr10xNRuEGKso4AUg0mpwLYzICj2+iHCo4jAOwJYAcES6l1g3wLwKum7TCsGghwBYC/ox7lA+qOZQPcBwD83IH769Q7CzdIUQY0IBWM4wF8xYiJKYALATxqwDIEIUROQTINjYEAryK4Kqwb5GgaeSpGDJ1inl2hHnkCGuNcTwfwhgH3SADfRuEGKcoAB6SKq+cRcOqsf4kA0OfXCNjxxrAyGsBGBqApgEsQ3BQ2EOACNAYC3AvgOjQGApyJ4HtULvkiQpSQgrtGjrwLijjXogxQQCr32RfA4Wh0c9gonAqAMQBOcxz0x6ifg9Tv9qAxEEDPUB7rDEWnAVhu2rydoLRRPj8A8Lhpk6IewleUogwoQCYGNDMNFywD+AeAywwHE3Kr4YY7aZxqYgCkeuKdqLspFMDTEELrlAM+Td3RcsDPIcSxapuYj3NvBNdIwSWLMqAAqQv8Uwg+xop51hSz4CsA9kBwh1QNOM5BOMlhDS8K3oRA6jLcbVPDYfX55xOYNhBgBj/X5/+GALfgno4Q8F64QYoyIACpXG0DAsue9r8e4ayjFUMvMEaaEsJZx4sMVxQE10TJ9PM4RU6rg34ZIVhdOeByhGgdywEPRDgTaTngVDT6OLfk/wqLa1He+iIiq7uW+DpTQukWkaqIvCkiW4lIIiKdbPMxtqmwiogczM+0zfbs4/P8u0NEUhEZKSIviEiNn4uI3Mg2ZTOOe8w4aiLyiIgMYh9ltrnQjXWpiGzBsaZrgEZFLWq0ru4OUy7id4nISi7uHi72aQ5Q64nIMw5QtxlQK6Du5GcLRWSU6QMi8ml+1mMAvZ8D9G4chx3LVNNPIiJvF5FX2UbHcrXbYIpa1LUOkLp4b3Vc6VkRGU4gKpjOMWCqikiXiGznOOiH2aaLrz9xgE1F5AHX5p/kfJYD/sxxwNdFZDSfpeM50YG7JiLvK0BZ1Leyrk4dSXWwSQAmY9XziEtRDwIYh3oIm1pRL0YINFdjzxD6LzWkThCyxiXmfzYQQL+3ExoPOycIIXVLzBg3QDhhIs7NMtf4OK1+W5SirFU6ZGK431zDjURE/srPS4Zj/dJx0JdEZEPHQU9zHLQiIhMdx9LXX+To79RIf+924u2BEZ322IJLFnVtE1l1sX6pidini/4DZtGrTneCaZOIyGYistjpdJdEgKE66zgRWe7a/48x8KQiMlhE5jud9Y8RnfWWiLi9vnlWsXCK2q8BmbLGDCNXOatnSUQedBw0pvP9PKLzbWyeFdsMzs7QSRHRSS0HPMJtBts0MUgVXLKo/R6QukgvauI66OyFVdRy0ClNAJEYq+3TOay2f3Ac8F8iMtSJtzOauGwKN0hR+y0gdZHvaDiTguibbfgNLWDuNVZT7zdMWowjj19zp8hYv+HGugHdLHas1xdcsqhrCyDvdFzniQjXOd9xnRUisrXjoB+NAOqQnEAosa/7HKDnsX8rEl/sxrJERMY4N8hnItx83wKURe2vgNRFeVgEREc5veydEb3sO5FAAS9y3tEGALTN7uzDirwnuUCAjUTkNafvXtFE31Uf52zzeWHgKWq/AWRiLJePOxDdHRFDb3Yc9DljuVSOdJYzynSLyIQ29TZ93hURo9BGjgN+OWIR3sOJt/tELMKfLbhkUfsbIFX0OyXi29vFLeoDIhz0E46DbikiyxzH+kEvFr7qmWMibpMfOzdIp4g8TCAqB/xLxGf6K7eZLKSOWbhBitovAKkLcRMRecMt+kvdou8QkTlO7JvFz+yiv85xtJeNYz/t5Wbxdfa5ks9eyUB1u1kcZMa2ku+PdpvFePo4e6j3CvXhgksWtV8AUhfhZQ5EiwhSKxZ+IWIY2cuB4v0RsfDzfVjwKuIOoXHJlgcjJz1+69osicS5fltWLbuZDapYTEVdLbXcy3jV9wD4BBqzwk1DyFXTwTZvQ/3+DE3neC1CzpuyiXW1GQU6AMxByJ3T2/T+Gpu6AsDnWbWfDoSr7eaaONspjIHVMQxiWpBbzCHl6Qj5ftZDPXfPngD+VgRfFmW1HiZuM3O5AvLPCPdraCbx+QjZ3TThcQXADwF80Rz+XYGQbfwZ1DOJH8d0HhXU00EeYE7x9yWTuA1CL0pR1opS7gUY/4tgtKc5NKVGJ4Fm72BMXEqNDgJwBELmOTEc9OYcYEyanMAQdzokjbStRvrzp15qDsx52hTlLWAgGVkcBswVEHk5pIJgCMU9zRjeAeD3TI1hb6P6HTmdctCnCdJmd3F0k8suQD0xVSzlSCsxtrjJqigDnkNqTpqpCDlnKgZYJxsO2g3gUIIxlpaxk9+xV5QrJ/shRd8s7qgg3QD1fK2J4YYJQr7XNwpxdUByRnDez0FIaqY5j+7n5l4dEHPehptji4iv8ELn5hgkIo+6QIF7IoECNznf3gsiMqKJb0+/dwTPOqrfs8aqEUAvMnKoNxbahL/D17SXftrV0c9Aq6UIXUptuLJOl3jZdaC4odKcu5MgXJQzzFgZNbV/YrjXiQin+qtGdJzidND9EC5XtYmTT0e4LCfG2RJjgZ3JXTI13Dcxf49GSPVY6oXYKuT8vvZG/F1d/Qy0Uo3QpR39byS/08Xv9aB+z8s6IbIqiPYE8FEHIr38Ro00oxFSZVg3x89Qv/xG0zPONJPTifrlN1miqorL70a4Cl3BLmhM06GpJMcjpPGYndNSa9NWftwZh1KEtJXt3LJcAnAMQuJn28881G/1WlfB+XHS2dJlAYDbc6oZdu5TM3/VdQWQCogLHKfy18MJZfuRqLs5FpPzWQ56AsFSQfx6uGb6w4fMpNnM6J7LlRBy+sxGvnw42uemCLlefZmSE5CJ2Yi+j3D9ni2/WEcBaYF2HsItY7bczprmAJaXjEpujaz1Jc3BHY8BsBsas4+fbCyoFYRLao5Do5tDL1DVIIANyVVt4mR7gWq1xa44OWJFPZmWWqDx5qpDe2EOt2JUD8IV6RVahtstr/K73aafpYXEitcjdFmc43s63zch+LGXISQtW4ZwI/dcZFvmBwSHtJesTkOjr/AWBLeGBdFMY3XVQIHvO9HyDIRLb5SDLieYmokqCr4JCHdGitkduxAyxQ3lGEumr4kI2c4fb4MjJYYeYv5Oe0lXvaOy1od+BlopRehSagOQfwGwLdelrpmXBhKByk2AUEVIxb+ZETHtBTXq5jgSwAfQ6OY4hTugBgpMQLjsxnLQmQCeMly2GSAPRj0CSJ/9EIA3+Zx5CD5MO9GT2gBks2CDxFUvIuftB230k0WLVv3be1DyuhLyjCPN2FDyPi/JSf9WdEk5529G+pYcz2vXLdKbfhLEA1Jim0wtj8iqC3hrrOorvBDAYwZEQ9F4yWqJetKvHQedQXDqnRrPIETutNIbakZ/9PrIH/i+ihDd48XWw1wfzQguTTYF9W/1GElBMhZAs34kRz9ZXEXnJGal9BZLMdICWoC31Tjss5s9L81B36xniKFbq/HUmny/1W/rjY+ynX6UUUiOeaqYtVpqxSFVFp+OEJmjYuhCrHrJ6hSEpMfKQStovL+xm7rfJMdBv0b5v5l7QhfClgjB7DAiMCg2w7yf6namPcjdn2/CJa0oPjxjHMMoIpXNAlQaLXOTVGI/sQXa6fqxZVkLCzNIZxXFRyMEuqeUEF5DiIZ62EgOaCEdDKWBLvZ7UrOwAGALALtTbRjN9s9Tf7sTdSd9LYOTlBCC9ktN6GLXgo5pudvgOrkm/c1kln46B+L66nGcNU8ZkbFmlmSsVb1lbWfSahxtJ4MNfV+iSjeHEly1YePKcMB/MHIk6nh3TnBzHlWygQIXRQ4BP+ICBe41h4BbOYMTEfmcOwQtIvI8c/Zo2+E8QykmfYeIyHHG4W8DACAiY3kgeY6ILDDf92UpP3uFry/x/SMiMoy/80ams3ycQQ6VSD8rXD+2rx0jR7lSk7z5d8x8l6c8yfOaozOOhyndL+WzX+TrczzYbedlErM9LGvyvL+LyM6RZyUicg3p8hjnLEaXlRG6LOTfPoPD0WbML5vvbW+e3yki95t+lMYPM00MWhws19+/r+njZfNMf3Bef/MQJuN+NOc8dTP/0zGWZj5SRaNp/uEOFT9oPtPFfaU7D/kqc7Pac4RfiaTJ2D1nVIX+0Nsim8M1keifGyJnL2/KSK4MpgfpS3mdgCzxt/el7OLGVnLpKMXRoMvVbv6/Zto+z6TUHiieXrFx7CYiv488W59jq3ChbuE22kTCZUp9KXuzr0F8/VRGu4kOuDMy2h2YY+35G9F8Ocj0oXTdkvmWxDCFHtKryxyA17nyG9OvdXNPI26O48lyva/QXrL6XgAfQ+Mlq2cDeMXolxsjXF1eM3rNlQBmobXDXkWojQDs5YwaAHBHxBhwR0Q33gfAKCcWIIdumafY8b/Zxz4lMg9nUwyvOFG5RNHN1g7zm1VP3ZQW8Xdk6HkV07ZifLFTANwHYH8+t8ushQ4zBrUkd9N6fkZElOwtXSTDeFJroYfr6+UcuxpOevh6WAtjTYL6oYkDjdiu9H+CNhJryxgB4DaqEz1oDFbpMHM0yMwVTN89HNdlAGplB4BRaLyEpgzgVwD+hMZLaGaiMVDgYYTLcmygwNkIURnq5liCcOlOnogMXZT/gfpV5yn/vxIhegZO57iLi6PT/NiRAPYFcIPZTOykrzTvUxLNlx4HPl101j/Zxb5qpp8kw8+JSF9W1+rh5J5ugJA4UD1PXaTC37sJN0AtHexnOF1CR0UAaTczXQeXchOEoWXJjbcUsdQLbQXDqPfF6JKQLmlkY+uJAC9L/02aWJv1OXMBPEj/edUYpyZxDF0Z69BGhW1tfq9a968nXcpmjZ1JV4zSy9Kpm56ExcaNONbowSXT/1EArvRizPecGLqc92bY3KnHRJJWTXIiw0R+ZtM+fs2JBHnShFxn2H/FJKLyeoC+16vpqkaEuzxDTOmgzrQFXz8QETmEuXnGUOccY+qm5rmbUKcewxw8z7lxiIhcm9HPGEM3HePlRvwWozs/xEzv67nfMkJEjqToXHN1Ga9hgBMpf+meIU5NEepeP2XfO0u49/NY2g7sM5Rm2zoReWNDlzG8W8XT5RY3D7YOcmvmkxljtjpsOZJV0NJwzyZiq373HPddPcAw0bXbyNhRau45P2S2+7Jb12P5mW2r6tzNNsHwtpwMS6xvu9ypw3n5jDXS3BrR5+5ypzkWUOnNk6lNP1+fC8ID5IwIsPX9uYaQSqAXjAGo2bPHZwDys72I2n8isvAuyfm7vYFK62u8hMi297/nSxmLcL/IHGUBUrihnGqA7OvFkQWb59TFvAhdrmvjtEceQOpmsLkxhNn5nN6EMShNZ0eYzgPm83KEOdnXazL6tf970NBC6fec1TtmOl/hs3R9WDfHqQDGmDbdDF9LjJh5OMVEHyiwIqe4qs/bGyEvT9X5a+4yYlzJiCMl+iatvlmjOLdnht81NVE0gzLGo/pZp3GQe8dvYsZRztCPyxn9pG5s21MnU3FWf/+vKKp2GjqK6buEcDYQhlYq8m2cw9EtnKNpCPHG0ykWWxqrCDuvDcd6KYNm3tfZkUGXdouKu88C+KPxkWt/B2fYMFTdeheDTMT4FYGQD8qL7O9386C/73vmN3lfqc7/rIjvfEOVmScBOCjiK7SXrI4H8BUXKPAjAI+i8ZJVHyhwF4AbkT9Hjg0mFzSe6liAkCTLHr2pcmOo8llPG/0jFlgQi5ZoFm0irl2svfShn5ob23YRo5GGjXWYzadsatoilrNVeJqC/ynqrq8ZA07VGUiqbRhpJPI726VLb4rS4ypDVwXcBG563tCl7w8ya1XtKCupP/oIm22NPqv9vUI/Y+rCKMsuhDKaEaNMwp9nlNROOnyvcQObTmeyBgq8hHDCwy6GkwBslREokHdHrdCReqCx4Ooif4KKeowL6fOepOIsjsgdRjnvzyfLN8+QGOaQ9j1NvruLAXPZLMZFOUPH1CpoLa9rY9E1extCoP/bzPou0wD1kDMc6euhztCpR/CedkbLEoMkbNsS273RZGwVN1f2BNPSMgGzA7mMfjjFWYr2A/ARvtdOzuBEq0VvS4qmyrkG02r3zza4o3Ls3RgdUnO72AGseUrJLMKtSID7m4ylEnnev6OMygDkQdyRvfVR52wL0t+KVUrPRx0nzCplw+VX15EmiSzGNV2UBosB3Argk871dSiAc806UJqOYYSX/V8C4GrDHPQ7Q0x0l6XVcISzw1lW3IRreA8zTqX5Y2WEU/8wJtvLIwv3NKNDAOGs4U+dKPQ5uhl0p11EP2Taxk6bOBEzBpB2A5l1VzyUvytponv0B0AOyfj/uW3208N5+DuAf5kFVsoJnjVR/h3Ho64iIK0OuwvdGguMviqUygY7N9vrAH7rQgl1jXdENs5tKF22s9415O7qMrnfKMOK/xTRR05iXJ5O6Gyz42i7HyGcbdTBPQHg5TZFRDUWHRwxwrS7u5ZdH5O5QfT30+VJE4C1GrsNKtc41VPRPAB8oBblbvdwQ9oKjfGmkxAOS1gx9FDntC+Rwy4yDCpx/tDYptaN1idC7OHqDqqJl5URojJalYdZm+2oz7IiIk7lFTGrtPC9K7KIyr2cGCX4DjSYzEX/PrXf3US/62ijn6e4kf4Z+U7jD7SiBpluWqhPw6qngS404BuFcIwQxrrqDUOeeVQywDaozbHeCuDTAFbGDojWmsi+3jLmB5K2aJOHMxxijDv2wPAl3KmagVw/extCCKAXWw9eCwC5OMMCeqsRsaQJV1hEA9BdCFbydTmHj/7u66hf27X+PoRQwRf4975UuWw46JPc0GLi9grUQwOt22MJ1b5mVmU9ffIcOaNeSZGUc+6ctZw7Ul92YSXEIREr1wLqqO2U/RGsrT61x3lreIH2lQ4vZOjANyIkDWun9PU6hoEits5BCKXb1dBjKEJo5hXGbmFjY1MEV0cXGg/RK6C6ESy4YyNMQTP5t8uMpL/oFbrrvwMhjtNan4B6cqjBWNWv4+tgtv1jxDC0K4I1uB3jjT3wm7TQHfR5lSYASTP60e8/5nRfbfMRY/Qp56gpVq+1dE2Cphld+lpU/LzG0Fmrbv7DCc7EGHMEIRgAGRIjEPyNFvhV9qVutjxz1ZCoqz8BEvwhlmvrxNyO7FPrWaexb3fKd4Wy/STE74jIOg2ukUn+hEFew4y+H4t6EEOsH918HkII0LbpDmtcMDtQVIqpFTaIQmnQ3+4fiWVZ6A19eyO23kDa2UCKffj3RNSzoesmNhvBZRdLM6ljvz/jmSfy96xAdkYDNTBVrXqX9qNdUsUGqwuWEJys9xnxLY/oCwRr8TKnoFvRpOYWyXLUT3/YnfV4BAvtxlT8N2BNmwBxRaSfvSl2b4Zwilz7seFVKULAxX1ojFACOf9NNDzE0kTYiBoVyTZD/0girLRa6qQOQfDHnRShS+dqXFuxULoaQojieIQQOG8/iYXK+fV6G+rZGK1U90EEt+BmZl78XNljiSPZNin3k8mqcUDvdf8rUel9rQ3jhF3YfyNxrIi6F8IRI++SeY362zudhXcjGlSWoB69khCk3l+r1swFCEd4amY37kA4ojaTwFez+jcQsueVzVh+gOA8tuKcBjjcjXr6h0Xmd2uqkZGs63PBfZaWwmbJxN6qOZ6PEFdsjSAlhNjPaY4u0xDyAZdX0/OFdDgYjbHAZyGE02k7TYtyfRP7ic7LfIQzpx82Rkj9rZ8CcAQ57bNms9d0MSM4TyO4ES0FsFN/AaRwAQ4xEyJGXE3atBamRmz9IBoDtVVfuBb1cDtdrL9DcOzaHLQ6cT7x8TZYNdBA39+McG2fRLj3UFYtO7rPUwRH9A0IgfrdqMeVKsB3dN9rVsa3aVxYEzqnGLoc1wu69LX4ULoNze/9aETsvxuNMdHNrKWnoH5u14KyyjWzT84xDgOwcX8QWZUIkw17V45TQT27XDuWUW17p3lfNeLCZCfbq2h4AcXcDjTGciZG5tcEv+MyJj6lRXQO6mGFNacP2pP4Y92Ytd1xFLE6zfOt7uETO2vtNq9APWYyRqOqq2lOjiSR7za7fcpuNLNy0mXzCIdq97neMLeYoFQrqequVuTXULlWKp098HA4103ZeQxido8eV3WdDQYw4d8NSOVamyBcwKPpKfQ0w3xaHZNeADJBCGZ4ylizNPPZ4RTnLOES7oofobhbdlY/tb6ppXdCE07QxX4UlGmkn0Hsx8anWlFqKUIo1xkUpVM0HjWzlroOUzvN69MIp0RiotcwM44Ovl8/J30HOXqWzWuzUkHI4/tATrp0Oj260z3X1rzr7SLOj/bRYcbfiXC07GbkuzNERdc7EbLy/ZpAt0fOyk3mSp/dTdVsYbtXmq8JQAotbUca4qtoNg/hQtjeOLe174MoXtac5fI6AC86PVKfMw7AlyiKbML/L6Xe+SSB9nvqqFlBxDWKMV9EiAoZxwlfjsa0jX+mqBzL9SpGj52MEOa4PcIpg+HGIr2Su78d3yyEONYlGXSZjOBmsjlgliFcfNQqcfVOCI70mnOvXMvNLCt4Q/8/FMAXqHuNJzjeJF2eIV3upcphN83tjG5tmcnVCMeeWkWGJcaQtHuEzt0E1YvoXZQZaDs4BCHwYCuKx0M43h7O/yKEs63zEfyjszhn+H+aYLze7YulngAAAABJRU5ErkJggg==";
const LOGO_IC = "data:image/png;base64,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";
const PAGE_TITLES = { dashboard: "Dashboard", ajuda: "Ajuda" };
const SERVICOS_DIVERSOS = [{"n": "Item","desc": "Descrição","dep": "Departamento","tipo": "Fixo","valor": "Valor","prazo": "Prazo","obs": "Observação"},{"n": 1,"desc": "Alteração do contrato social, atas de reunião ou resolução de sócios, e atualizações cadastrais junto a qualquer órgão público municipal, estadual, federal ou autarquia","dep": "Societário","tipo": "Variável","valor": "1.500 até 2.500","prazo": "15 a 45 dias após recebimento de…","obs": "Esse valor é para SP para outro municipios pode chegar até 2.500,00 dependo do processo da…"},{"n": 2,"desc": "Constituição e baixa de filiais e/ou de outras empresas ligadas","dep": "Societário","tipo": "Variável","valor": "1.500 até 2.500","prazo": "15 a 45 dias após recebimento de…","obs": "Esse valor é para SP para outro municipios pode chegar até 2.500,00 dependo do processo da…"},{"n": 3,"desc": "Certidões negativas de débitos e de regularidade de tributos federais, estaduais, municipais, INSS, FGTS, Ministério do Trabalho e Emprego, PROCON ou qualquer outra exigida por autarquias ou órgãos governamentais (caso precise ir presencialmente)","dep": "Societário","tipo": "Fixo","valor": "R$ 250","prazo": "30 dias após recebimento de toda…","obs": "Só cobramos certidões que precisão ser solicitadas e que possuem taxa, o que sai pela a in…"},{"n": 4,"desc": "Certidões de falências, protestos ou quaisquer outras de âmbito forense, bem como certidões de objeto e pé sobre processos de qualquer natureza","dep": "Societário","tipo": "Variável","valor": "R$ 500","prazo": "30 dias após recebimento de toda…","obs": "Dependendo do processo esse valor pode ser alterado"},{"n": 5,"desc": "Elaboração de contratos, instrumentos, termos, notificações ou documentos de qualquer natureza com terceiros","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 6,"desc": "Parcelamento de débitos presencial e recorrência em recálculos de tributos ou taxas em atraso, enviados tempestivamente para recolhimento pela CONTRATADA","dep": "","tipo": "Fixo","valor": "R$ 350","prazo": "","obs": ""},{"n": 7,"desc": "Acompanhar empregado do CONTRATANTE para homologação junto ao sindicato da categoria ou órgão local do Ministério do Trabalho e Emprego","dep": "","tipo": "Hora","valor": "R$ 150","prazo": "","obs": "Valor hora"},{"n": 8,"desc": "Declaração de Ajuste Anual do Imposto de Renda da Pessoa Física (DIRPF) e regularizações de pendências junto à RFB quando não motivadas pela CONTRATADA","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 9,"desc": "Preenchimento de cadastros, propostas de financiamentos e pesquisas relativas a dados não contábeis","dep": "","tipo": "Hora","valor": "R$ 150","prazo": "","obs": "Valor hora"},{"n": 10,"desc": "Obtenção de registro ou certidão junto a Conselhos Regionais ou qualquer outra autarquia","dep": "","tipo": "Fixo","valor": "R$ 750","prazo": "","obs": ""},{"n": 11,"desc": "Obrigações trabalhistas e previdenciárias de empregados domésticos ou que não façam parte do quadro de empregados do CONTRATANTE","dep": "","tipo": "Por pessoa","valor": "R$ 150","prazo": "","obs": "por empregado"},{"n": 12,"desc": "Processos de retificação de guias de arrecadação e documentos de recolhimento (DARF, GPS, GFIP, GARE ou similares)","dep": "","tipo": "Hora","valor": "R$ 150","prazo": "","obs": "Valor hora"},{"n": 13,"desc": "Processos de compensação e/ou ressarcimento de tributos, contribuições e taxas, quando não motivados pela CONTRATADA","dep": "","tipo": "Percentual","valor": "15%","prazo": "","obs": "Percentual cobrado baseado no crédito gerado"},{"n": 14,"desc": "Planejamento tributário, análise de preços de transferência (Transfer Pricing) e controles internos (contas a pagar, receber, financeiro e estoques)","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 15,"desc": "Registro Eletrônico do Documento Fiscal (REDF) – Nota Fiscal Paulista","dep": "","tipo": "Hora","valor": "R$ 250","prazo": "","obs": "Valor hora"},{"n": 16,"desc": "Atendimento a auditores e/ou consultores independentes, auditoria interna, elaboração de laudos ou relatórios contábeis ou tributários","dep": "","tipo": "Hora","valor": "R$ 200","prazo": "","obs": "Valor hora"},{"n": 17,"desc": "Processos de aposentadorias e pensões de qualquer natureza","dep": "","tipo": "Hora","valor": "R$ 200","prazo": "","obs": "Valor hora"},{"n": 18,"desc": "Elaboração e homologação do programa de participação nos lucros ou resultados e atuação junto ao sindicato","dep": "","tipo": "Hora","valor": "R$ 150","prazo": "","obs": "Valor hora"},{"n": 19,"desc": "Controle e apuração do complemento ou ressarcimento do ICMS Substituição (método permanente ou anual)","dep": "","tipo": "Hora","valor": "R$ 250","prazo": "","obs": "Valor hora"},{"n": 20,"desc": "Registro Declaratório Eletrônico (RDE) – BACEN","dep": "","tipo": "Hora","valor": "R$ 250","prazo": "","obs": "Valor hora"},{"n": 21,"desc": "Serviços referentes a períodos anteriores ao início dos trabalhos da CONTRATADA","dep": "","tipo": "Hora","valor": "R$ 250","prazo": "","obs": "Valor hora"},{"n": 22,"desc": "Registro de operações no SISCOSERV, SISCOMEX ou sistemas correlatos","dep": "","tipo": "Hora","valor": "R$ 250","prazo": "","obs": "Valor hora"},{"n": 23,"desc": "Pedidos de segunda via de documentos","dep": "","tipo": "Variável","valor": "R$ 450","prazo": "","obs": "Valor pode variar"},{"n": 24,"desc": "Preenchimento de formulários (BNDES, IBGE, Caixa Econômica Federal etc.)","dep": "","tipo": "Fixo","valor": "R$ 750","prazo": "","obs": ""},{"n": 25,"desc": "Prevenção das certidões fiscais","dep": "","tipo": "Variável","valor": "Sob consulta","prazo": "","obs": ""},{"n": 26,"desc": "Recálculo de impostos (R$ 30,00 por guia recalculada, cobrado apenas em caso de solicitações constantes)","dep": "","tipo": "Fixo","valor": "R$ 30","prazo": "","obs": "Combramos somente se for algo recorrente a aprtir do 3º mês"},{"n": 27,"desc": "Declaração de IRPF","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 28,"desc": "Revisão de processos","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 29,"desc": "Conversão do sistema USGAAP","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 30,"desc": "Acompanhamento em fiscalizações fiscais","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 31,"desc": "Passivo de conciliações das contas do Ativo e Passivo de exercícios anteriores","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 32,"desc": "Execução de serviços acumulados","dep": "","tipo": "Hora","valor": "R$ 350","prazo": "","obs": "Valor hora"},{"n": 33,"desc": "Outras atividades não especificadas no Anexo de Atividades/Responsabilidades","dep": "","tipo": "Hora","valor": "Depende do serviço.","prazo": "","obs": "Valor hora"},{"n": 34,"desc": "Gestão completa do processo admissional, desde a solicitação e conferência de documentos junto ao candidato/colaborador até a formalização e assinatura dos contratos e termos aplicáveis.","dep": "","tipo": "Hora","valor": "R$ 270","prazo": "","obs": "Valor por pessoa baseado em 1h30 sendo R$180,00 por hora"},{"n": 35,"desc": "Baixa de empresa em São Paulo","dep": "Societário","tipo": "Fixo","valor": "R$ 1.800","prazo": "2 meses","obs": ""},{"n": 36,"desc": "Atualização cadastral na Prefeitura, Posto Fiscal, entre outros.","dep": "Societário","tipo": "Fixo","valor": "R$ 350","prazo": "20 dias","obs": "Processo digital. Quando presencial, o cliente deve absorver os custos de lomocação, impre…"},{"n": 37,"desc": "Registro de Atas","dep": "Societário","tipo": "Fixo","valor": "R$ 750","prazo": "10 dias","obs": ""}];


const SERVICOS = [
  { key: "contabil", nome: "Contabilidade", custoHora: 66.05938398140887, Icon: BookText },
  { key: "fiscal", nome: "Fiscal", custoHora: 63.82487018881627, Icon: Receipt },
  { key: "pessoal", nome: "Dep. Pessoal", custoHora: 69.14129920116196, Icon: Users },
  { key: "financeiro", nome: "BPO Financeiro", custoHora: 57.71143323996266, Icon: Wallet },
  { key: "rh", nome: "BPO de RH", custoHora: 58.16460784313725, Icon: UserCog },
  { key: "controladoria", nome: "BPO Controladoria", custoHora: 69.5501633986928, Icon: LineChart },
];

const REGIME_OPTS = [{ tag: "simples", lbl: "S", nome: "Simples" }, { tag: "presumido", lbl: "P", nome: "Presumido" }, { tag: "real", lbl: "R", nome: "Real" }];
const PERIODOS = ["Mensal", "Trimestral", "Anual", "Eventual"];
const SEG_OPTS = [{ tag: "comercio", lbl: "C", nome: "Comércio" }, { tag: "servico", lbl: "S", nome: "Serviço" }, { tag: "industria", lbl: "I", nome: "Indústria" }];
const SEG_ALL = ["comercio", "servico", "industria"];
function regimeTag(r) { if (/simples|mei/i.test(r)) return "simples"; if (/presumido/i.test(r)) return "presumido"; if (/real|arbitrad/i.test(r)) return "real"; return "presumido"; }
function escopoSeed() {
  const mk = (nome, periodicidade, regimes, horasSistema) => ({ id: uid(), nome, periodicidade, regimes, horasSistema, segmentos: ["comercio", "servico", "industria"] });
  const T = ["simples", "presumido", "real"];
  return {
    contabil: [mk("Registro contábil dos documentos", "Mensal", T, 2), mk("Balancete e DRE", "Mensal", T, 3), mk("Balanço Patrimonial", "Anual", T, 1), mk("ECD — Escrituração Contábil Digital", "Anual", ["presumido", "real"], 1), mk("ECF — Escrituração Contábil Fiscal", "Anual", ["presumido", "real"], 1), mk("DEFIS", "Anual", ["simples"], 1)],
    fiscal: [mk("Escrituração fiscal de entradas e saídas", "Mensal", T, 5), mk("Apuração do DAS (Simples Nacional)", "Mensal", ["simples"], 1), mk("Apuração de impostos retidos (IRRF, ISS, INSS)", "Mensal", T, 2), mk("Apuração de PIS e COFINS", "Mensal", ["presumido", "real"], 2), mk("Apuração de IRPJ e CSLL", "Trimestral", ["presumido", "real"], 1), mk("Apuração de ICMS e IPI", "Mensal", ["presumido", "real"], 2), mk("DCTFWeb", "Mensal", T, 1), mk("EFD-Contribuições", "Mensal", ["presumido", "real"], 1.5), mk("SPED Fiscal (EFD ICMS/IPI)", "Mensal", ["presumido", "real"], 2)],
    pessoal: [mk("Folha de pagamento", "Mensal", T, 3), mk("Admissões e rescisões", "Eventual", T, 1), mk("eSocial e FGTS/INSS (DCTFWeb)", "Mensal", T, 2), mk("Férias e 13º salário", "Anual", T, 1)],
    financeiro: [mk("Contas a pagar e a receber", "Mensal", T, 3), mk("Conciliação bancária", "Mensal", T, 2), mk("Fluxo de caixa", "Mensal", T, 2)],
    rh: [mk("Recrutamento e seleção", "Eventual", T, 1), mk("Controle de ponto e banco de horas", "Mensal", T, 2), mk("Gestão de benefícios", "Mensal", T, 1)],
    controladoria: [mk("Relatórios gerenciais e KPIs", "Mensal", T, 3), mk("Orçamento e acompanhamento (budget)", "Mensal", ["presumido", "real"], 2), mk("Análise de margem e rentabilidade", "Mensal", T, 2)],
  };
}
const SVC_BY_KEY = Object.fromEntries(SERVICOS.map((s) => [s.key, s]));
const PACOTES = [
  { id: "contabil", nome: "BPO Contábil", keys: ["contabil", "fiscal", "pessoal"], desc: "Contabilidade · Fiscal · Dep. Pessoal" },
  { id: "financeiro", nome: "BPO Financeiro", keys: ["financeiro"], desc: "Gestão financeira terceirizada" },
  { id: "rh", nome: "BPO RH", keys: ["rh"], desc: "Recursos Humanos" },
  { id: "controladoria", nome: "BPO Controladoria", keys: ["controladoria"], desc: "Controladoria e consultoria" },
];

const ATIV = {
  contabil: [
    ["Integração Financeira, Folha e Fiscal", "Mensal"],
    ["Conciliação", "Mensal"],
    ["Análise e conciliação do Balancete / DRE", "Mensal"],
    ["Apuração IRPJ e CSLL (LALUR)", "Mensal"],
    ["ECF - Escrituração Contábil Fiscal", "Anual"],
    ["ECD - Escrituração Contábil Digital", "Anual"],
    ["DEFIS", "Anual"],
    ["Atendimento à Auditoria", "Anual"],
    ["Consultoria / Atendimentos / Reuniões", "Mensal"],
  ],
  fiscal: [
    ["Emissão de notas", "Mensal"],
    ["Apuração de ISS, retenções na fonte e NFTS", "Mensal"],
    ["Apuração do ICMS", "Mensal"],
    ["Simples Nacional", "Mensal"],
    ["Apuração de PIS e COFINS", "Mensal"],
    ["Apuração de IRPJ e CSLL", "Trimestral"],
    ["Prevenção", "Mensal"],
    ["DCTF Web", "Mensal"],
    ["EFD Reinf", "Mensal"],
    ["MIT", "Mensal"],
    ["Sped EFD - ICMS/IPI - GIA", "Mensal"],
    ["Sped EFD - PIS e COFINS", "Mensal"],
    ["DeSTDA e DIFAL", "Anual"],
    ["DIRB", "Anual"],
    ["Diagnóstico EFD Contrib, SPED Fiscal, Bloco K e H", "Mensal"],
    ["Consultoria / Atendimentos / Reuniões", "Mensal"],
  ],
  pessoal: [
    ["Processamento da Folha / Estagiário / Intermitente", "Mensal"],
    ["Pró-Labore", "Mensal"],
    ["Autônomo / RPA", "Mensal"],
    ["eSocial / Sefip / Caged / DCTF Web", "Mensal"],
    ["Acompanhamento / Aplicação da Convenção", "Mensal"],
    ["Consultoria / Atendimentos", "Mensal"],
  ],
  financeiro: [
    ["Input do contas a pagar no banco", "Mensal"],
    ["Conciliação Bancária", "Mensal"],
    ["Emissão de NF de Serviço", "Mensal"],
    ["Salvar documentação na rede", "Mensal"],
    ["Anexar NF no ERP", "Mensal"],
    ["Enviar documentação para contabilidade", "Mensal"],
    ["Enviar relatórios", "Mensal"],
    ["Reunião", "Mensal"],
  ],
  rh: [],
  controladoria: [],
};

const REGIMES = ["MEI", "Simples Nacional", "Lucro Presumido", "Lucro Real", "Arbitrado"];
const INCIDENCIAS = ["Mensal", "Trimestral", "Semestral", "Anual"];

let _id = 100;
const uid = () => `id${_id++}`;

function buildServices(opts = {}) {
  const enabled = opts.enabled || [];
  const out = {};
  for (const s of SERVICOS) {
    out[s.key] = { enabled: enabled.includes(s.key), custoHora: s.custoHora, margem: 50, horasTime: {} };
  }
  return out;
}

const ATIVIDADES_OPTS = ["Serviço", "Comércio", "Comércio Varejista", "Distribuidora", "Indústria", "Equiparada a Indústria", "Importação", "Exportação (Serviços)", "Exportação (Vendas)"];
const SERVICOS_OPTS = ["Contábil", "Fiscal", "Folha de Pagamento", "Controladoria", "BPO de RH"];

const FICHA = [
  { sec: "Geral", campos: [
    { k: "nome", l: "Nome (contato)", t: "text" },
    { k: "razaoSocial", l: "Razão social", t: "text" },
    { k: "cnpj", l: "CNPJ", t: "text" },
    { k: "email", l: "E-mail", t: "text" },
    { k: "atividadeDesc", l: "Descreva as atividades realizadas pela empresa", t: "textarea" },
    { k: "regime", l: "Qual o regime tributário?", t: "select", opts: REGIMES },
    { k: "atividades", l: "Quais as atividades?", t: "multi", opts: ATIVIDADES_OPTS },
    { k: "possuiFiliais", l: "Possui filiais?", t: "simnao" },
    { k: "quantasFiliais", l: "Quantas filiais?", t: "number" },
    { k: "tipoSociedade", l: "Possui tipo de sociedade?", t: "select", opts: ["Não Possui", "SCP", "SPE"] },
    { k: "possuiERP", l: "Possui ERP financeiro (sistema)?", t: "simnao" },
    { k: "qualERP", l: "Qual ERP?", t: "text" },
  ] },
  { sec: "Fiscal", campos: [
    { k: "servicosContratados", l: "Serviços contábeis a contratar", t: "multi", opts: SERVICOS_OPTS },
    { k: "faturamentoMensal", l: "Faturamento mensal médio", t: "number" },
    { k: "notasServPrestados", l: "Notas de serviços prestados (méd.)", t: "number" },
    { k: "notasSaida", l: "Notas de saída/venda (méd.)", t: "number" },
    { k: "recibosEmitidos", l: "Recibos/faturas emitidos (méd.)", t: "number" },
    { k: "notasServTomados", l: "Notas de serviços tomados (méd.)", t: "number" },
    { k: "notasEntrada", l: "Notas de entrada/compra (méd.)", t: "number" },
    { k: "notasDevolucao", l: "Notas de devolução de vendas (méd.)", t: "number" },
    { k: "parcelamentoImpostos", l: "Possui parcelamento de impostos?", t: "simnao" },
    { k: "impostosAtraso", l: "Possui impostos em atraso?", t: "simnao" },
  ] },
  { sec: "Folha de pagamento", campos: [
    { k: "sociosProLabore", l: "Sócios com pró-labore", t: "number" },
    { k: "empCLT", l: "Empregados CLT", t: "number" },
    { k: "empPJ", l: "Empregados PJ", t: "number" },
    { k: "empRPA", l: "Contratados RPA", t: "number" },
    { k: "empEstagiarios", l: "Estagiários/aprendizes", t: "number" },
    { k: "contratosIntermitentes", l: "Contratos intermitentes", t: "number" },
    { k: "folhaPorDepto", l: "Folha separada por departamento?", t: "simnao" },
    { k: "qtdDepartamentos", l: "Quantos departamentos?", t: "number" },
    { k: "rotatividade", l: "Rotatividade de contratação (CLT)", t: "select", opts: ["0%", "5%", "10%", "20%", "30%", "50%", "Outra"] },
  ] },
  { sec: "Contábil", campos: [
    { k: "periodicidadeRecebe", l: "Periodicidade que recebe demonstrativos hoje", t: "select", opts: ["Não recebo", "Mensal", "Trimestral", "Semestral", "Anual", "Outra"] },
    { k: "periodicidadeDeseja", l: "Periodicidade que deseja receber", t: "select", opts: ["Mensal", "Trimestral", "Semestral", "Anual"] },
    { k: "diaMes", l: "Se mensal, em qual dia do mês?", t: "number" },
    { k: "emprestimos", l: "Possui empréstimos/financiamentos?", t: "simnao" },
    { k: "dreCentroCusto", l: "DRE por centro de custo?", t: "simnao" },
  ] },
  { sec: "Final", campos: [
    { k: "infoAdicional", l: "Informações adicionais / particularidades", t: "textarea" },
  ] },
];

function segmentosDeAtividades(ativs) {
  const s = new Set();
  for (const a of ativs || []) {
    if (["Serviço", "Exportação (Serviços)"].includes(a)) s.add("servico");
    if (["Comércio", "Comércio Varejista", "Distribuidora"].includes(a)) s.add("comercio");
    if (["Indústria", "Equiparada a Indústria"].includes(a)) s.add("industria");
  }
  return s.size ? [...s] : ["comercio"];
}
function mapServicos(arr) {
  const m = { "Contábil": "contabil", "Fiscal": "fiscal", "Folha de Pagamento": "pessoal", "Controladoria": "controladoria", "BPO de RH": "rh" };
  const out = (arr || []).map((x) => m[x]).filter(Boolean);
  return out.length ? out : ["fiscal"];
}

const SAMPLE_FORM = {
  arquivo: "Ficha_Tecnica_MOTOBR.pdf",
  nome: "MOTOBR", razaoSocial: "MTBR Peças e Ac para Motos LTDA",
  cnpj: "24.064.968/0001-40", email: "financeiro@motobr.com.br",
  atividadeDesc: "45.41-2-06 — Comércio a varejo de peças e acessórios para motocicletas; 45.43-9-00 — Manutenção e reparação de motocicletas.",
  regime: "Lucro Presumido",
  atividades: ["Comércio Varejista", "Serviço"],
  possuiFiliais: "Sim", quantasFiliais: 6, tipoSociedade: "Não Possui",
  possuiERP: "Sim", qualERP: "Pro Logos",
  servicosContratados: ["Contábil", "Fiscal"],
  faturamentoMensal: 3750000, notasServPrestados: 50, notasSaida: 11015,
  recibosEmitidos: 0, notasServTomados: 55, notasEntrada: 471, notasDevolucao: 54,
  parcelamentoImpostos: "Não", impostosAtraso: "Não",
  sociosProLabore: 2, empCLT: 10, empPJ: 4, empRPA: 0, empEstagiarios: 0,
  contratosIntermitentes: 5, folhaPorDepto: "Sim", qtdDepartamentos: 4, rotatividade: "5%",
  periodicidadeRecebe: "Mensal", periodicidadeDeseja: "Mensal", diaMes: 10,
  emprestimos: "Não", dreCentroCusto: "Não",
  infoAdicional: "As empresas Mtbr têm 7 unidades; em cada Mtbr (Lucro Presumido) no máximo 2 funcionários registrados, os demais nas empresas do Simples Nacional (Sbc Vergueiro, Top Mtbr e Moto Napoli).",
};
const BLANK_CAD = { nome: "", razaoSocial: "", cnpj: "", email: "", atividadeDesc: "", regime: "Simples Nacional", atividades: [], possuiFiliais: "Não", quantasFiliais: "", tipoSociedade: "Não Possui", possuiERP: "Não", qualERP: "", servicosContratados: [], faturamentoMensal: "", notasServPrestados: "", notasSaida: "", recibosEmitidos: "", notasServTomados: "", notasEntrada: "", notasDevolucao: "", parcelamentoImpostos: "Não", impostosAtraso: "Não", sociosProLabore: "", empCLT: "", empPJ: "", empRPA: "", empEstagiarios: "", contratosIntermitentes: "", folhaPorDepto: "Não", qtdDepartamentos: "", rotatividade: "0%", periodicidadeRecebe: "Mensal", periodicidadeDeseja: "Mensal", diaMes: "", emprestimos: "Não", dreCentroCusto: "Não", infoAdicional: "" };

const SEED_ENTITIES = [
  {
    id: "e1", tipo: "matriz",
    nome: "MTBR Peças e Ac para Motos LTDA",
    regime: "Lucro Presumido", segmentos: ["comercio"], faturamento: 3750000,
    formulario: SAMPLE_FORM,
    services: buildServices({ enabled: ["fiscal", "contabil"] }),
  },
  {
    id: "e2", tipo: "filial",
    nome: "MTBR — Filial 02 (SBC)",
    regime: "Simples Nacional", segmentos: ["servico"], faturamento: 420000,
    services: buildServices({ enabled: ["fiscal"] }),
  },
];

const SIDE = {
  bg: "#171d2e", active: "#2a3350", accent: "#4263eb",
  text: "#eef0f6", dim: "#9aa3b8", faint: "#6b7488",
  border: "#242b3e", toggle: "#10141f",
};

const THEMES = {
  dark: {
    appBg: "#141a28", head: "#171d2e", card: "#1d2436", cardAlt: "#252e44",
    border: "#2f3a55", borderSoft: "#28324a", text: "#f2f5fc", dim: "#b0b8cb", faint: "#828ba1",
    accent: "#5b8cff", accentText: "#ffffff", accentSoft: "#1c2942",
    amber: "#fbbf24", green: "#34d399", red: "#f87171", input: "#11151f",
  },
  light: {
    appBg: "#f6f7fb", head: "#ffffff", card: "#ffffff", cardAlt: "#f8f9fc",
    border: "#eaecf2", borderSoft: "#f0f1f6", text: "#1e2433", dim: "#6b7280", faint: "#9aa1ad",
    accent: "#4263eb", accentText: "#ffffff", accentSoft: "#e8edfb",
    amber: "#d97706", green: "#16a34a", red: "#dc2626", input: "#ffffff",
  },
};

const brl = (n) =>
  (Number(n) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (n) => (Math.round((Number(n) || 0) * 100) / 100).toLocaleString("pt-BR");
const pct = (n) => `${((Number(n) || 0) * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

function computeEntity(entity, params, escopoFixos, soKeys) {
  if (!entity) {
    const ps = {};
    for (const s of SERVICOS) ps[s.key] = { enabled: false, horas: 0, custo: 0, honorario: 0, honorarioImp: 0 };
    return { porServico: ps, totalHoras: 0, custo: 0, honorarioAntes: 0, honorarioFinal: 0, impostos: 0, rol: 0, mc: 0, despAdm: 0, despMkt: 0, lucro: 0, lucroPct: 0 };
  }
  const imp = (params.imposto || 0) / 100;
  const adm = (params.admPct || 0) / 100;
  const mkt = (params.mktPct || 0) / 100;
  const tag = regimeTag(entity.regime);
  const segs = entity.segmentos && entity.segmentos.length ? entity.segmentos : SEG_ALL;
  const porServico = {};
  let totalHoras = 0, custo = 0, honorarioAntes = 0, honorarioFinal = 0;
  for (const s of SERVICOS) {
    const incl = !soKeys || soKeys.includes(s.key);
    const sv = entity.services[s.key];
    const margem = (sv.margem || 0) / 100;
    const ativs = ((escopoFixos && escopoFixos[s.key]) || []).filter((a) => a.regimes.includes(tag) && (a.segmentos || SEG_ALL).some((x) => segs.includes(x)));
    const ht = sv.horasTime || {};
    const horas = ativs.reduce((acc, a) => acc + (ht[a.id] != null ? Number(ht[a.id]) : (Number(a.horasSistema) || 0)), 0);
    const c = horas * sv.custoHora;
    const hon = margem >= 1 ? 0 : c / (1 - margem);
    const honImp = imp >= 1 ? 0 : hon / (1 - imp);
    porServico[s.key] = { enabled: incl && sv.enabled, horas, custo: c, honorario: hon, honorarioImp: honImp };
    if (incl && sv.enabled) { totalHoras += horas; custo += c; honorarioAntes += hon; honorarioFinal += honImp; }
  }
  const impostos = honorarioFinal - honorarioAntes;
  const rol = honorarioAntes;
  const mc = rol - custo;
  const despAdm = rol * adm;
  const despMkt = rol * mkt;
  const lucro = mc - despAdm - despMkt;
  return { porServico, totalHoras, custo, honorarioAntes, honorarioFinal, impostos, rol, mc, despAdm, despMkt, lucro, lucroPct: rol ? lucro / rol : 0 };
}

const fieldStyle = (t) => ({
  background: t.input, color: t.text, border: `1px solid ${t.border}`,
  borderRadius: 8, padding: "7px 10px", fontSize: 13, outline: "none", width: "100%",
  fontFamily: "inherit", boxSizing: "border-box",
});
const lblS = (t) => ({ fontSize: 11.5, color: t.faint, marginBottom: 5 });
function parseValor(v) {
  if (typeof v === "number") return v;
  const m = String(v || "").match(/(\d[\d.]*,?\d*)/);
  if (!m) return null;
  const n = Number(m[1].replace(/\./g, "").replace(",", "."));
  return isFinite(n) ? n : null;
}
function formaPagtoTxt(pag, parc, valorNum, mensal) {
  if (pag === "avista") return mensal ? "Vencimentos mensais até o dia 05 do mês subsequente à prestação do serviço." : "Pagamento à vista.";
  let s = "Pagamento em " + parc + "x";
  if (valorNum && valorNum > 0) s += " de " + brl(valorNum / parc);
  return s + ".";
}

function NavItem({ icon: Icon, label, active, collapsed, onClick }) {
  return (
    <div onClick={onClick} style={{
      position: "relative",
      display: "flex", alignItems: "center", gap: 11, padding: collapsed ? "10px 0" : "9px 12px",
      justifyContent: collapsed ? "center" : "flex-start", borderRadius: 8, cursor: "pointer",
      background: active ? SIDE.active : "transparent", color: active ? "#ffffff" : SIDE.dim,
      fontSize: 13.5, fontWeight: active ? 600 : 500, transition: "background .15s",
    }}>
      {active && !collapsed && <span style={{ position: "absolute", left: 0, top: 7, bottom: 7, width: 3, borderRadius: 2, background: SIDE.accent }} />}
      <Icon size={18} strokeWidth={2} color={active ? "#ffffff" : SIDE.dim} />
      {!collapsed && <span>{label}</span>}
    </div>
  );
}

function MetricCard({ t, label, value, sub, color, icon: Icon }) {
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "16px 18px", flex: 1, minWidth: 160 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 11.5, color: t.dim, textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 600 }}>{label}</span>
        {Icon && <span style={{ width: 34, height: 34, borderRadius: 9, background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={17} /></span>}
      </div>
      <div style={{ fontSize: 27, fontWeight: 700, color: color || t.text, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: t.faint, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function ActivityRow({ t, a, onChange, onRemove }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 108px 64px 108px 30px", gap: 8, alignItems: "center", padding: "5px 0" }}>
      <div style={{ fontSize: 12.5, color: t.text, paddingRight: 4 }}>{a.nome}</div>
      <select value={a.incidencia} onChange={(e) => onChange("incidencia", e.target.value)} style={{ ...fieldStyle(t), padding: "6px 8px" }}>
        {INCIDENCIAS.map((i) => <option key={i} value={i}>{i}</option>)}
      </select>
      <input type="number" min="0" step="0.5" value={a.horas} onChange={(e) => onChange("horas", e.target.value)}
        style={{ ...fieldStyle(t), padding: "6px 8px", textAlign: "right" }} />
      <div style={{ fontSize: 12.5, fontWeight: 600, color: t.text, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
        {brl((Number(a.horas) || 0) * a._custoHora / (1 - a._margem))}
      </div>
      <button onClick={onRemove} title="Remover" style={{ background: "transparent", border: "none", color: t.faint, cursor: "pointer", display: "flex", justifyContent: "center" }}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function ServiceCard({ t, svc, sv, calc, ativs, expanded, onToggleExpand, onToggleEnabled, onUpdateService, onUpdateHoras }) {
  const { Icon } = svc;
  const margem = (sv.margem || 0) / 100;
  const ht = sv.horasTime || {};
  const teamH = (a) => (ht[a.id] != null ? ht[a.id] : a.horasSistema);
  const cols = "1fr 70px 62px 72px 84px";
  return (
    <div style={{ background: t.card, border: `1px solid ${sv.enabled ? t.border : t.borderSoft}`, borderRadius: 14, marginBottom: 12, opacity: sv.enabled ? 1 : 0.72 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", cursor: "pointer" }} onClick={onToggleExpand}>
        <span onClick={(e) => { e.stopPropagation(); onToggleEnabled(); }}
          style={{ width: 38, height: 22, borderRadius: 11, background: sv.enabled ? t.accent : t.border, position: "relative", flexShrink: 0, transition: "background .15s" }}>
          <span style={{ position: "absolute", top: 2, left: sv.enabled ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
        </span>
        <span style={{ width: 32, height: 32, borderRadius: 9, background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={17} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{svc.nome}</div>
          <div style={{ fontSize: 11.5, color: t.faint }}>custo/hora {brl(sv.custoHora)} · {num(calc.horas)} h/mês</div>
        </div>
        <div style={{ textAlign: "right", marginRight: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text, fontVariantNumeric: "tabular-nums" }}>{brl(calc.honorarioImp)}</div>
          <div style={{ fontSize: 11, color: t.faint }}>c/ imposto</div>
        </div>
        <ChevronDown size={17} color={t.faint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </div>

      {expanded && (
        <div style={{ borderTop: `1px solid ${t.borderSoft}`, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginBottom: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: t.dim }}>
              Margem desejada
              <input type="number" min="0" max="99" step="1" value={sv.margem} onChange={(e) => onUpdateService("margem", e.target.value)}
                style={{ ...fieldStyle(t), width: 64, padding: "5px 8px", textAlign: "right" }} />
              <span style={{ color: t.faint }}>%</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: t.dim }}>
              Custo/hora
              <input type="number" min="0" step="0.01" value={Math.round(sv.custoHora * 100) / 100} onChange={(e) => onUpdateService("custoHora", e.target.value)}
                style={{ ...fieldStyle(t), width: 88, padding: "5px 8px", textAlign: "right" }} />
            </label>
          </div>

          {ativs.length > 0 ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: cols, gap: 8, fontSize: 11, color: t.faint, fontWeight: 600, paddingBottom: 4, borderBottom: `1px solid ${t.borderSoft}` }}>
                <span>Atividade</span><span style={{ textAlign: "center" }}>Período</span><span style={{ textAlign: "right" }}>Sistema</span><span style={{ textAlign: "right" }}>Time</span><span style={{ textAlign: "right" }}>Valor</span>
              </div>
              {ativs.map((a) => {
                const th = teamH(a);
                const dif = (Number(th) || 0) !== (Number(a.horasSistema) || 0);
                return (
                  <div key={a.id} style={{ display: "grid", gridTemplateColumns: cols, gap: 8, alignItems: "center", padding: "5px 0" }}>
                    <div style={{ fontSize: 12.5, color: t.text, paddingRight: 4 }}>{a.nome}</div>
                    <div style={{ fontSize: 11, color: t.faint, textAlign: "center" }}>{a.periodicidade}</div>
                    <div style={{ fontSize: 12.5, color: t.faint, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{num(a.horasSistema)}</div>
                    <input type="number" min="0" step="0.5" value={th} onChange={(e) => onUpdateHoras(a.id, e.target.value)}
                      style={{ ...fieldStyle(t), padding: "6px 8px", textAlign: "right", borderColor: dif ? t.accent : t.border, color: dif ? t.accent : t.text, fontWeight: dif ? 600 : 400 }} />
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: t.text, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{brl((Number(th) || 0) * sv.custoHora / (1 - margem))}</div>
                  </div>
                );
              })}
            </>
          ) : (
            <div style={{ fontSize: 12.5, color: t.faint, padding: "6px 0 12px" }}>
              Nenhuma atividade para este regime. Configure o escopo em Configurações.
            </div>
          )}

          <div style={{ fontSize: 11, color: t.faint, marginTop: 10, lineHeight: 1.5 }}>As atividades vêm do escopo (Configurações), filtradas pelo regime da empresa. A coluna "Sistema" é a sugestão automática (travada); ajuste a do "Time".</div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.borderSoft}`, fontSize: 12.5 }}>
            <span style={{ color: t.dim }}>Honorário <b style={{ color: t.text }}>{brl(calc.honorario)}</b></span>
            <span style={{ color: t.dim }}>Com imposto <b style={{ color: t.text }}>{brl(calc.honorarioImp)}</b></span>
          </div>
        </div>
      )}
    </div>
  );
}
function DRELine({ t, label, value, percent, strong, color, sub }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: strong ? "11px 0 2px" : "6px 0", borderTop: strong ? `1px solid ${t.border}` : "none" }}>
      <span style={{ fontSize: strong ? 13.5 : 12.5, color: strong ? t.text : t.dim, fontWeight: strong ? 700 : 500 }}>
        {label}{percent != null && <span style={{ color: t.faint, fontWeight: 400 }}> · {pct(percent)}</span>}
      </span>
      <span style={{ fontSize: strong ? 14.5 : 13, fontWeight: strong ? 700 : 600, color: color || t.text, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

function EmBreve({ t, titulo }) {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{titulo}</h1>
      <p style={{ fontSize: 13.5, color: t.dim, margin: "0 0 24px" }}>Esta tela entra na próxima etapa da plataforma.</p>
      <div style={{ background: t.card, border: `1px dashed ${t.border}`, borderRadius: 14, padding: "48px 24px", textAlign: "center", color: t.faint, fontSize: 14 }}>Em breve</div>
    </div>
  );
}

function escopoModelo(item) {
  let s = (item.desc || "").trim();
  if (item.obs && String(item.obs).trim()) s += "\n\nObservações: " + String(item.obs).trim();
  if (item.prazo && String(item.prazo).trim()) s += "\nPrazo de referência: " + String(item.prazo).trim() + ".";
  s += "\n\nValor: " + (item.valor || "") + (item.tipo === "Hora" ? " por hora" : "") + ".";
  return s;
}

function TabelaPrecos({ t, data, onGerar, actionLabel = "Proposta", embedded = false }) {
  const [q, setQ] = useState("");
  const filtered = data.filter((s) => (s.desc + " " + s.dep + " " + s.tipo).toLowerCase().includes(q.toLowerCase()));
  const tipoCor = { Hora: t.accent, Fixo: t.green, Percentual: t.amber, "Por pessoa": t.accent, "Variável": t.dim };
  const cols = "1fr 110px 88px 96px 116px";
  return (
    <div>
      {!embedded && <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Proposta de serviços diversos</h1>}
      {!embedded && <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 18px" }}>Selecione um serviço e gere a proposta. O cadastro (escopo, preço, prazo) fica em Configurações — {data.length} itens.</p>}
      {embedded && <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>Catálogo de serviços diversos <span style={{ color: t.faint, fontWeight: 600 }}>· {data.length} itens</span></div>}
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar serviço, departamento ou tipo..." style={{ ...fieldStyle(t), maxWidth: 380, marginBottom: 16 }} />
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 14, padding: "10px 16px", background: t.cardAlt, fontSize: 11, fontWeight: 700, color: t.faint, textTransform: "uppercase", letterSpacing: ".03em" }}>
          <span>Serviço</span><span>Departamento</span><span>Tipo</span><span style={{ textAlign: "right" }}>Valor</span><span></span>
        </div>
        {filtered.map((s) => (
          <div key={s.n} style={{ display: "grid", gridTemplateColumns: cols, gap: 14, padding: "12px 16px", borderTop: `1px solid ${t.borderSoft}`, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 13, color: t.text, lineHeight: 1.45 }}>{s.desc}</div>
              {s.escopo ? <div style={{ fontSize: 11, color: t.green, marginTop: 3 }}>Escopo cadastrado</div> : (s.obs ? <div style={{ fontSize: 11.5, color: t.faint, marginTop: 3 }}>{s.obs}</div> : null)}
            </div>
            <div>
              {s.dep && <span style={{ fontSize: 11, fontWeight: 600, color: t.accent, background: t.accentSoft, padding: "3px 8px", borderRadius: 6 }}>{s.dep}</span>}
              {s.prazo && <div style={{ fontSize: 11, color: t.faint, marginTop: 5 }}>{s.prazo}</div>}
            </div>
            <div><span style={{ fontSize: 11.5, fontWeight: 600, color: tipoCor[s.tipo] || t.dim }}>{s.tipo}</span></div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{s.valor}</div>
            <div style={{ textAlign: "right" }}><button onClick={() => onGerar(s)} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{actionLabel === "Adicionar" ? <Plus size={13} /> : <FileText size={13} />} {actionLabel}</button></div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding: "24px 16px", textAlign: "center", color: t.faint, fontSize: 13 }}>Nenhum serviço encontrado.</div>}
      </div>
    </div>
  );
}
function extenso(num) {
  num = Math.round(Number(num) || 0);
  if (num === 0) return "zero reais";
  const u = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dz = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const ct = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  const tres = (n) => {
    if (n === 0) return "";
    if (n === 100) return "cem";
    let s = ""; const c = Math.floor(n / 100), r = n % 100;
    if (c) s += ct[c];
    if (r) { if (s) s += " e "; if (r < 20) s += u[r]; else { const d = Math.floor(r / 10), un = r % 10; s += dz[d]; if (un) s += " e " + u[un]; } }
    return s;
  };
  const mi = Math.floor(num / 1000000), ml = Math.floor((num % 1000000) / 1000), re = num % 1000;
  const partes = [];
  if (mi) partes.push(tres(mi) + (mi === 1 ? " milhão" : " milhões"));
  if (ml) partes.push(ml === 1 ? "mil" : tres(ml) + " mil");
  if (re) partes.push(tres(re));
  return partes.join(" e ") + " reais";
}

function montarPropostaHTML(d) {
  const C = { navy:"#0f1f47", navy2:"#16234d", deep:"#0a1530", blue:"#2e5cb8", blue2:"#5b86d8", light:"#f5f7fc", band:"#eef2fb", line:"#e6e9f0", ink:"#3a4152", mut:"#5b647a", faint:"#9aa3b2", ice:"#aebfe0" };
  const chev = (cor) => `<svg viewBox="0 0 110 95" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"><g stroke="${cor}" stroke-width="12" stroke-linecap="round" fill="none"><line x1="8" y1="86" x2="52" y2="12"/><line x1="33" y1="86" x2="77" y2="12"/><line x1="58" y1="86" x2="102" y2="12"/></g></svg>`;
  const marca = `<span style="display:inline-flex;align-items:center;gap:8px"><span style="width:24px;height:21px;display:inline-block">${chev(C.navy)}</span><span style="font-size:18px;font-weight:800;color:${C.navy};letter-spacing:-.2px">Attentive</span></span>`;
  const ic = {
    mail:`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>`,
    phone:`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.7"><path d="M6 3h3l2 5-2.6 1.8a13 13 0 0 0 5.8 5.8L16 13l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 3-2z"/></svg>`,
    pin:`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.7"><path d="M12 22s7-6.5 7-12A7 7 0 0 0 5 10c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
    web:`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18"/></svg>`,
  };
  const pic = {
    grow:`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${C.blue}" stroke-width="1.9"><path d="M4 19L19 5M11 5h8v8"/></svg>`,
    bulb:`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${C.blue}" stroke-width="1.9"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10c.7.8 1 1.5 1 2.5h6c0-1 .3-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>`,
    team:`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${C.blue}" stroke-width="1.9"><circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 7a3 3 0 0 1 0 5M17 14.5a5.5 5.5 0 0 1 3.4 4.5"/></svg>`,
  };
  const timeline = [
    ["2004","Fundada pelos sócios Edvaldo e Enivaldo Moreira, reunindo 17 anos de experiência na Ambev e em multinacionais."],
    ["2006","Edinaldo Moreira entra como sócio; passamos a atender empresas de médio porte no Lucro Presumido e Real."],
    ["2015","Inauguração de uma nova sede em Moema, São Paulo."],
    ["2019","Amauri Júnior entra como sócio da área fiscal; lançamos a solução de BPO Financeiro."],
    ["2022","Nasce o Grupo Attentive (Attentive + Conex &amp; Result), com Fernando Moreira como sócio e CEO."],
    ["2023","Rayane Delfino integra o quadro societário, liderando o Departamento Pessoal."],
    ["2024","Inauguração da nova sede na Av. Paulista, São Paulo."],
    ["2026","Karine Gomes assume o Departamento Pessoal; Rayane lidera as frentes Administrativa, Societária e de RH."],
  ];
  const css = `
    @page { size:A4; margin:0; }
    * { box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    body { margin:0; font-family:"Segoe UI",Helvetica,Arial,sans-serif; color:${C.ink}; font-size:12.5px; line-height:1.55; }
    .page { position:relative; width:100%; min-height:295mm; padding:20mm 20mm 22mm; page-break-after:always; overflow:hidden; }
    .page:last-child { page-break-after:auto; }
    p { margin:0 0 12px; }
    b { color:${C.navy}; }
    /* running header / footer */
    .rh { display:flex; justify-content:space-between; align-items:center; padding-bottom:11px; border-bottom:1px solid ${C.line}; margin-bottom:26px; }
    .rh .pg { font-size:10.5px; letter-spacing:1.5px; text-transform:uppercase; color:${C.faint}; }
    .rf { position:absolute; left:20mm; right:20mm; bottom:12mm; display:flex; justify-content:space-between; font-size:10px; color:${C.faint}; border-top:1px solid ${C.line}; padding-top:8px; }
    /* section heads */
    .sh { display:flex; align-items:center; gap:14px; margin-bottom:18px; }
    .sh .bdg { width:44px; height:44px; border-radius:13px; background:${C.navy}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; flex-shrink:0; }
    .sh .ey { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:${C.blue}; font-weight:700; }
    .sh h2 { font-size:24px; color:${C.navy}; font-weight:800; margin:1px 0 0; letter-spacing:-.5px; }
    /* COVER */
    .cover { background:linear-gradient(140deg,${C.navy2} 0%,${C.deep} 100%); color:#fff; padding:0; display:flex; flex-direction:column; }
    .cover .bigchev { position:absolute; right:-34mm; top:18mm; width:150mm; height:150mm; opacity:.10; }
    .cover .band { padding:17mm 20mm 0; font-size:11px; letter-spacing:4px; text-transform:uppercase; color:${C.blue2}; font-weight:600; }
    .cover .hero { padding:0 20mm; }
    .cover .hero .kick { font-size:13px; letter-spacing:3px; text-transform:uppercase; color:${C.blue2}; font-weight:700; }
    .cover .hero h1 { font-size:52px; font-weight:800; letter-spacing:-1.6px; line-height:1.04; margin:10px 0 0; }
    .cover .hero .forr { font-size:17px; color:${C.ice}; margin-top:14px; }
    .cover .hero .forr b { color:#fff; }
    .cover .meta { display:flex; padding:0 20mm; margin-top:20mm; }
    .cover .meta > div { margin-right:46px; }
    .cover .meta .k { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:${C.blue2}; font-weight:600; }
    .cover .meta .v { font-size:15px; font-weight:600; margin-top:4px; color:#fff; }
    .cover .foot { padding:11mm 20mm; border-top:1px solid rgba(255,255,255,.13); display:flex; justify-content:space-between; align-items:center; font-size:11.5px; color:${C.ice}; }
    .cover .foot .att { display:flex; align-items:center; gap:9px; }
    .cover .foot .att .cv { width:22px; height:20px; display:inline-block; }
    .sp { flex:1; }
    /* lead / pillars / stats */
    .lead { font-size:25px; line-height:1.28; color:${C.navy}; font-weight:800; letter-spacing:-.4px; margin:0 0 14px; }
    .lead span { color:${C.blue}; }
    .pillars { display:flex; margin-top:8px; }
    .pcard { flex:1; background:${C.light}; border:1px solid ${C.line}; border-radius:15px; padding:17px 16px; margin-right:13px; }
    .pcard:last-child { margin-right:0; }
    .pcard .pic { width:40px; height:40px; border-radius:11px; background:#e5ecfa; display:flex; align-items:center; justify-content:center; margin-bottom:11px; }
    .pcard h4 { margin:0 0 5px; font-size:13.5px; color:${C.navy}; font-weight:700; }
    .pcard p { margin:0; font-size:11.5px; color:${C.mut}; line-height:1.5; }
    .stats { display:flex; margin-top:13px; }
    .stat { flex:1; background:${C.navy}; color:#fff; border-radius:15px; padding:16px 18px; margin-right:13px; }
    .stat:last-child { margin-right:0; }
    .stat .n { font-size:25px; font-weight:800; letter-spacing:-.5px; }
    .stat .l { font-size:10.5px; color:${C.ice}; margin-top:2px; line-height:1.35; }
    /* timeline */
    .tl { position:relative; padding-left:74px; margin-top:4px; }
    .tl .rail { position:absolute; left:58px; top:8px; bottom:10px; width:2px; background:${C.line}; }
    .tlr { position:relative; padding-bottom:15px; }
    .tlr .yr { position:absolute; left:-74px; top:-2px; width:44px; text-align:right; font-size:16px; font-weight:800; color:${C.blue}; }
    .tlr .dot { position:absolute; left:-20px; top:3px; width:12px; height:12px; border-radius:50%; background:${C.navy}; box-shadow:0 0 0 3px #fff,0 0 0 5px ${C.line}; }
    .tlr .tx { font-size:11.5px; color:${C.ink}; line-height:1.5; }
    /* escopo */
    .uh { display:flex; align-items:center; gap:8px; margin:16px 0 7px; font-size:13px; font-weight:700; color:${C.navy}; }
    .uh .chip { font-size:10px; font-weight:600; color:${C.blue}; background:#e5ecfa; padding:2px 9px; border-radius:20px; letter-spacing:.2px; }
    table.esc { width:100%; border-collapse:separate; border-spacing:0; border:1px solid ${C.line}; border-radius:12px; overflow:hidden; margin-top:2px; }
    table.esc th { background:${C.navy}; color:#fff; font-size:10.5px; letter-spacing:.6px; text-transform:uppercase; text-align:left; padding:10px 14px; font-weight:600; }
    table.esc th.p, table.esc td.p { text-align:center; width:155px; }
    table.esc td { padding:9px 14px; font-size:12px; color:${C.ink}; border-top:1px solid ${C.line}; }
    table.esc td.p { color:${C.mut}; }
    table.esc tr.grp td { background:${C.band}; color:${C.navy}; font-weight:700; font-size:11.5px; letter-spacing:.2px; }
    .escobs { font-size:11.5px; color:${C.mut}; margin-top:10px; line-height:1.55; }
    /* equipe */
    .deps { display:flex; flex-wrap:wrap; margin:14px 0 4px; }
    .deps .d { font-size:12px; font-weight:600; color:${C.navy}; background:${C.light}; border:1px solid ${C.line}; border-radius:20px; padding:7px 15px; margin:0 8px 8px 0; }
    /* honorarios */
    .checks { margin:2px 0 16px; }
    .chk { display:flex; gap:11px; margin-bottom:9px; align-items:flex-start; }
    .chk .ck { width:20px; height:20px; border-radius:50%; background:#e5ecfa; color:${C.blue}; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
    .chk span.t { font-size:12.5px; color:${C.ink}; }
    .bd { width:100%; border-collapse:collapse; margin:0 0 14px; }
    .bd td { padding:9px 0; border-bottom:1px solid ${C.line}; font-size:12.5px; color:${C.ink}; }
    .bd td.v { text-align:right; font-weight:700; color:${C.navy}; font-variant-numeric:tabular-nums; }
    .bdh { font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${C.faint}; font-weight:700; margin-bottom:4px; }
    .hon { position:relative; background:linear-gradient(140deg,${C.navy2},${C.deep}); color:#fff; border-radius:20px; padding:26px 30px; overflow:hidden; }
    .hon .cv { position:absolute; right:-16mm; top:-16mm; width:80mm; height:80mm; opacity:.08; }
    .hon .lab { font-size:12.5px; color:${C.ice}; }
    .hon .big { font-size:44px; font-weight:800; letter-spacing:-1.5px; margin:5px 0 3px; }
    .hon .big small { font-size:18px; font-weight:600; color:${C.ice}; letter-spacing:0; }
    .hon .ext { font-size:12px; color:${C.blue2}; font-style:italic; }
    .pay { display:flex; gap:13px; align-items:flex-start; margin-top:20px; padding-top:18px; border-top:1px solid rgba(255,255,255,.15); }
    .pay .pl { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:${C.ice}; font-weight:700; flex-shrink:0; width:120px; padding-top:1px; }
    .pay .pv { font-size:13px; color:#fff; line-height:1.5; }
    /* callout */
    .callout { background:${C.band}; border-radius:15px; padding:18px 22px; margin-top:6px; }
    .callout .h { font-weight:800; color:${C.navy}; font-size:14px; margin-bottom:4px; display:flex; align-items:center; gap:8px; }
    .callout p { margin:0; font-size:12.5px; color:${C.ink}; }
    /* close */
    .close { background:linear-gradient(140deg,${C.navy2},${C.deep}); color:#fff; display:flex; flex-direction:column; padding:0; }
    .close .bigchev { position:absolute; right:-30mm; bottom:-20mm; width:140mm; height:140mm; opacity:.09; }
    .close .body { padding:32mm 20mm 0; }
    .close .kick { font-size:13px; letter-spacing:3px; text-transform:uppercase; color:${C.blue2}; font-weight:700; }
    .close h2 { font-size:44px; font-weight:800; letter-spacing:-1.3px; margin:10px 0 6px; line-height:1.08; }
    .close .sub { font-size:15px; color:${C.ice}; max-width:120mm; }
    .cinfo { padding:20mm 20mm 0; }
    .crow { display:flex; align-items:center; gap:14px; margin-bottom:16px; font-size:14px; color:#fff; }
    .crow .ic { width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,.09); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .crow .k { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:${C.ice}; }
    .crow .v { font-size:14px; color:#fff; margin-top:1px; }
    .close .foot { margin-top:auto; padding:11mm 20mm; border-top:1px solid rgba(255,255,255,.13); display:flex; justify-content:space-between; font-size:11.5px; color:${C.ice}; }
    .noprint { position:fixed; top:14px; right:14px; z-index:9; }
    .noprint button { background:${C.navy}; color:#fff; border:none; border-radius:9px; padding:11px 18px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; box-shadow:0 8px 24px rgba(0,0,0,.3); }
    @media print { .noprint { display:none; } }
  `;
  const rf = (s) => `<div class="rf"><span>Grupo Attentive &bull; Gestão Empresarial</span><span>${s}</span></div>`;
  const rh = (lbl) => `<div class="rh">${marca}<span class="pg">${lbl}</span></div>`;
  const cliente = d.cliente, cnpj = d.cnpj || "—";

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Proposta ${d.numero} — ${cliente}</title><style>${css}</style></head><body>
<div class="noprint"><button onclick="window.print()">Salvar / Imprimir PDF</button></div>

<div class="page cover">
  <div class="bigchev">${chev("#ffffff")}</div>
  <div class="band">Grupo Attentive &bull; Gestão Empresarial</div>
  <div class="sp"></div>
  <div class="hero">
    <div class="kick">Proposta Comercial${d.pacoteNome ? " &bull; " + d.pacoteNome : ""}</div>
    <h1>${d.tipo === "diverso" ? "Soluções sob<br>medida para você." : "Sua contabilidade,<br>sem preocupações."}</h1>
    <div class="forr">Preparada para <b>${cliente}</b></div>
  </div>
  <div class="meta">
    <div><div class="k">CNPJ</div><div class="v">${cnpj}</div></div>
    <div><div class="k">Proposta</div><div class="v">Nº ${d.numero}</div></div>
    <div><div class="k">Data</div><div class="v">${d.data}</div></div>
  </div>
  <div class="sp"></div>
  <div class="foot"><span>attentivecontabilidade.com.br</span><span class="att"><span class="cv">${chev("#ffffff")}</span> Att. Consultoria e Treinamento</span></div>
</div>

<div class="page">
  ${rh("Quem somos")}
  <div class="lead">A Attentive <span>pensa em você</span> — e no resultado da sua empresa.</div>
  <p>Somos uma empresa moderna e dinâmica, com a missão de <b>aumentar o lucro de nossos clientes</b>. Levamos soluções empresariais inteligentes, apoiadas por estrutura e tecnologia, atuando de forma integrada e próxima.</p>
  <div class="pillars">
    <div class="pcard"><div class="pic">${pic.team}</div><h4>Relacionamento estreito</h4><p>Atendimento próximo e consultivo, com um sócio à frente de cada conta.</p></div>
    <div class="pcard"><div class="pic">${pic.bulb}</div><h4>Soluções inteligentes</h4><p>Tecnologia e processos que organizam a rotina e geram informação de gestão.</p></div>
    <div class="pcard"><div class="pic">${pic.grow}</div><h4>Foco em resultado</h4><p>Leitura estratégica dos números para apoiar suas decisões e ampliar o lucro.</p></div>
  </div>
  <div class="stats">
    <div class="stat"><div class="n">+20 anos</div><div class="l">de trajetória no mercado</div></div>
    <div class="stat"><div class="n">9 áreas</div><div class="l">de serviço sob um só time</div></div>
    <div class="stat"><div class="n">São Paulo</div><div class="l">Av. Paulista &bull; atend. nacional</div></div>
  </div>
  ${rf(cliente)}
</div>

<div class="page">
  ${rh("Trajetória")}
  <div class="lead">+20 anos desenhando <span>a nossa trajetória.</span></div>
  <div class="tl"><div class="rail"></div>
    ${timeline.map((x) => `<div class="tlr"><div class="yr">${x[0]}</div><div class="dot"></div><div class="tx">${x[1]}</div></div>`).join("")}
  </div>
  ${rf(cliente)}
</div>

<div class="page">
  <div class="sh"><div class="bdg">I</div><div><div class="ey">Escopo</div><h2>Escopo do Trabalho</h2></div></div>
  <p style="margin-top:-4px">Atividades contempladas nesta proposta e suas respectivas periodicidades.</p>
  ${d.escopoHTML}
  ${d.escopoObs ? `<div class="escobs">${d.escopoObs}</div>` : ""}
  ${rf(cliente)}
</div>

<div class="page">
  <div class="sh"><div class="bdg">II</div><div><div class="ey">Time</div><h2>Equipe Profissional</h2></div></div>
  <p>Os serviços serão executados por uma equipe de profissionais dirigida por um <b>sócio do Grupo Attentive</b>. Cada frente é conduzida por especialistas dedicados, garantindo qualidade técnica e continuidade no atendimento à sua empresa.</p>
  <div class="deps"><span class="d">Contábil</span><span class="d">Fiscal</span><span class="d">Departamento Pessoal</span><span class="d">BPO Financeiro</span><span class="d">BPO RH</span><span class="d">Controladoria</span></div>
  <p style="margin-top:14px">Você conta ainda com tecnologia de apoio — indicadores financeiros (B.I.), portal do empregado e a plataforma Gestta para organizar toda a rotina de processos.</p>
  ${rf(cliente)}
</div>

<div class="page">
  <div class="sh"><div class="bdg">III</div><div><div class="ey">Investimento</div><h2>Honorários Profissionais</h2></div></div>
  <p style="margin-top:-4px">Nossos honorários consideram, principalmente:</p>
  <div class="checks">
    <div class="chk"><span class="ck">&#10003;</span><span class="t">Conhecimento e experiência da equipe profissional, como garantia da qualidade dos serviços.</span></div>
    <div class="chk"><span class="ck">&#10003;</span><span class="t">Características e complexidade das operações da empresa, mapeadas no diagnóstico inicial.</span></div>
  </div>
  ${d.honTabela ? `<div class="bdh">Honorário por empresa</div><table class="bd">${d.honTabela}</table>` : ""}
  <div class="hon">
    <div class="cv">${chev("#ffffff")}</div>
    <div class="lab">Os honorários estimados para os serviços propostos serão de:</div>
    <div class="big">${d.valor} <small>${d.periodo || ""}</small></div>
    ${d.extenso ? `<div class="ext">(${d.extenso})</div>` : ""}
    <div class="pay"><div class="pl">Forma de pagamento</div><div class="pv">${d.formaPagamento}</div></div>
  </div>
  ${rf(cliente)}
</div>

<div class="page">
  <div class="sh"><div class="bdg">IV</div><div><div class="ey">Complementos</div><h2>Outros Serviços, se aplicável</h2></div></div>
  <p>Os valores aqui apresentados referem-se ao escopo desta proposta. Caso necessitem de serviços adicionais — implantação de sistemas ERP, consultas fiscais ou trabalhistas, questões societárias, alterações contratuais, entre outros — teremos satisfação em apresentar proposta específica.</p>
  <p>Agradecemos a oportunidade e colocamo-nos à disposição para quaisquer esclarecimentos.</p>
  <div class="callout">
    <div class="h">${pic.grow}&nbsp;Como aceitar</div>
    <p>Caso concordem com o teor desta carta-proposta, basta confirmar via e-mail o seu <b>&ldquo;De acordo&rdquo;</b>. Em seguida elaboramos o Contrato de Prestação de Serviços e damos início aos trabalhos.</p>
  </div>
  ${rf(cliente)}
</div>

<div class="page close">
  <div class="bigchev">${chev("#ffffff")}</div>
  <div class="body">
    <div class="kick">Vamos começar?</div>
    <h2>Será um prazer<br>cuidar da sua empresa.</h2>
    <div class="sub">Fale com a nossa equipe e tire qualquer dúvida sobre esta proposta.</div>
  </div>
  <div class="cinfo">
    <div class="crow"><span class="ic">${ic.phone}</span><div><div class="k">Telefone</div><div class="v">+55 11 9 8867 0174</div></div></div>
    <div class="crow"><span class="ic">${ic.mail}</span><div><div class="k">E-mail</div><div class="v">atendimento@attentivecontabilidade.com.br</div></div></div>
    <div class="crow"><span class="ic">${ic.pin}</span><div><div class="k">Endereço</div><div class="v">Av. Paulista, 1274 &bull; Conj. 33 &bull; 13º andar &bull; Bela Vista &bull; São Paulo &bull; SP</div></div></div>
    <div class="crow"><span class="ic">${ic.web}</span><div><div class="k">Site</div><div class="v">attentivecontabilidade.com.br</div></div></div>
  </div>
  <div class="sp"></div>
  <div class="foot"><span>Grupo Attentive &bull; Gestão Empresarial</span><span>Proposta Nº ${d.numero}</span></div>
</div>

</body></html>`;
}

function Propostas({ t, theme, grupo, entities, perEntity, group, avulso, escopoFixos, pacoteKeys, pacoteNome, onVoltar }) {
  const [confirmado, setConfirmado] = useState(false);
  const [gerado, setGerado] = useState(false);
  const [escopoTxt, setEscopoTxt] = useState(avulso ? (avulso.escopo || avulso.desc) : "");
  const [pagFixo, setPagFixo] = useState("À vista, no 5º dia útil do mês subsequente à prestação do serviço.");
  const [pagTipo, setPagTipo] = useState("avista");
  const [parcelas, setParcelas] = useState(3);
  const pagDivTxt = pagTipo === "avista" ? "À vista." : `Parcelado em ${parcelas}x.`;
  const pill = (on) => ({ background: on ? t.accent : "transparent", color: on ? "#fff" : t.dim, border: `1px solid ${on ? t.accent : t.border}`, borderRadius: 8, padding: "7px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" });
  const matrizEnt = entities && entities.find((e) => e.tipo === "matriz");
  const matrizCnpj = (matrizEnt && matrizEnt.formulario && matrizEnt.formulario.cnpj) || "";
  const baixarProposta = () => {
    const hoje = new Date().toLocaleDateString("pt-BR");
    let dados;
    if (avulso) {
      const escopoHTML = `<table class="esc"><tr><th>Serviço</th><th class="p">Prazo</th></tr><tr><td>${avulso.desc}</td><td class="p">${avulso.prazo || "—"}</td></tr></table>`;
      const vnum = parseValor(avulso.valor);
      dados = { tipo: "diverso", numero: "2026.01", data: hoje, cliente: avulso.cliente || grupo.nome, cnpj: avulso.cnpj || "", escopoHTML, escopoObs: (escopoTxt && escopoTxt !== avulso.desc) ? escopoTxt.replace(/\n/g, "<br>") : "", valor: avulso.valor, periodo: avulso.tipo === "Hora" ? "/ hora" : "", extenso: vnum ? extenso(vnum) : "", honTabela: "", formaPagamento: pagDivTxt };
    } else {
      const escopoHTML = entities.map((e) => {
        const tag = regimeTag(e.regime);
        const segs = e.segmentos && e.segmentos.length ? e.segmentos : SEG_ALL;
        const contratados = SERVICOS.filter((sv) => e.services[sv.key].enabled && pacoteKeys.includes(sv.key));
        const blocos = contratados.map((sv) => {
          const ativ = ((escopoFixos && escopoFixos[sv.key]) || []).filter((a) => a.regimes.includes(tag) && (a.segmentos || SEG_ALL).some((x) => segs.includes(x)));
          const rows = ativ.map((a) => `<tr><td>${a.nome}</td><td class="p">${a.periodicidade}</td></tr>`).join("");
          return `<tr class="grp"><td colspan="2">${sv.nome}</td></tr>${rows || '<tr><td class="p" colspan="2">—</td></tr>'}`;
        }).join("");
        const uh = entities.length > 1 ? `<div class="uh">${e.nome} <span class="chip">${e.regime}</span> <span class="chip">${e.tipo === "matriz" ? "Matriz" : "Filial"}</span></div>` : "";
        return `${uh}<table class="esc"><tr><th>Atividades</th><th class="p">Periodicidade</th></tr>${blocos || '<tr><td class="p" colspan="2">Nenhum serviço contratado.</td></tr>'}</table>`;
      }).join("");
      const honTabela = entities.map((e) => `<tr><td>${e.nome}</td><td class="v">${brl(calcDe(e.id).honorarioFinal)}</td></tr>`).join("");
      dados = { tipo: "fixo", pacoteNome: pacoteNome, numero: "2026.01", data: hoje, cliente: grupo.nome, cnpj: matrizCnpj, escopoHTML, escopoObs: "", valor: brl(group.honorarioFinal), periodo: "/ mês", extenso: `${extenso(group.honorarioFinal)} por mês`, honTabela: entities.length > 1 ? honTabela : "", formaPagamento: pagFixo };
    }
    const html = montarPropostaHTML(dados);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `Proposta_${(dados.cliente || "cliente").replace(/[^a-z0-9]+/gi, "_")}.html`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
    setGerado(true);
  };
  const calcDe = (id) => perEntity.find((p) => p.id === id).calc;
  const sec = { fontSize: 13.5, fontWeight: 700, color: t.accent, margin: "0 0 10px" };
  const valorTxt = avulso ? `${avulso.valor}${avulso.tipo === "Hora" ? " / hora" : ""}` : `${brl(group.honorarioFinal)} / mês`;
  const voltarBtn = (<button onClick={onVoltar} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>← Voltar</button>);

  if (!confirmado) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Gerar proposta</h1>
          {voltarBtn}
        </div>
        <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 18px" }}>{avulso ? "Serviço avulso da tabela de preços." : "Proposta dos serviços fixos do grupo."}</p>
        <div style={{ background: t.card, border: `1px solid ${t.accent}`, borderRadius: 14, padding: "22px 24px", maxWidth: 460 }}>
          <div style={{ fontSize: 13, color: t.dim }}>{avulso ? avulso.desc : grupo.nome}</div>
          <div style={{ fontSize: 12.5, color: t.faint, margin: "12px 0 2px" }}>Confirme o valor antes de gerar:</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: t.text, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{valorTxt}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <button onClick={() => setConfirmado(true)} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Check size={15} /> Confirmar e gerar</button>
            <button onClick={onVoltar} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "9px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  if (avulso) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Proposta — serviço avulso</h1>
          <div style={{ display: "flex", gap: 8 }}>{voltarBtn}<button onClick={baixarProposta} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><FileText size={15} /> Baixar proposta (PDF)</button></div>
        </div>
        <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 18px" }}>Gerada a partir da tabela de preços, com um clique.</p>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "24px 26px", maxWidth: 760 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: t.faint, letterSpacing: ".04em", textTransform: "uppercase" }}>Grupo Attentive • Gestão Empresarial</div>
          <div style={{ fontSize: 21, fontWeight: 700, margin: "8px 0 2px" }}>Proposta Comercial — Serviço avulso</div>
          <div style={{ fontSize: 13, color: t.dim }}>Nº 2026.01 · {grupo.nome}</div>
          <div style={{ height: 1, background: t.border, margin: "18px 0" }} />
          <div style={sec}>Escopo do serviço <span style={{ fontSize: 11, fontWeight: 500, color: t.faint }}>· editável</span></div>
          <textarea value={escopoTxt} onChange={(ev) => setEscopoTxt(ev.target.value)} rows={4} style={{ width: "100%", boxSizing: "border-box", background: t.cardAlt, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, lineHeight: 1.5, fontFamily: "inherit", resize: "vertical" }} />
          <div style={{ fontSize: 11, color: t.faint, marginTop: 5 }}>Ajuste antes de enviar — ex.: município, prazo, condições específicas.</div>
          {avulso.dep && <div style={{ fontSize: 12, color: t.faint, marginTop: 8 }}>Departamento: {avulso.dep}</div>}
          {avulso.prazo && <div style={{ fontSize: 12, color: t.faint, marginTop: 2 }}>Prazo de referência: {avulso.prazo}</div>}
          <div style={{ height: 1, background: t.border, margin: "18px 0" }} />
          <div style={sec}>Honorários profissionais</div>
          <div style={{ marginTop: 4, padding: "14px 16px", background: t.cardAlt, borderRadius: 10 }}>
            <div style={{ fontSize: 13, color: t.dim }}>Valor do serviço ({avulso.tipo}):</div>
            <div style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 2px" }}>{valorTxt}</div>
            <div style={{ fontSize: 12.5, color: t.text, marginTop: 12, marginBottom: 6, fontWeight: 600 }}>Forma de pagamento</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={() => setPagTipo("avista")} style={pill(pagTipo === "avista")}>À vista</button>
              <button onClick={() => setPagTipo("parcelado")} style={pill(pagTipo === "parcelado")}>Parcelado</button>
              {pagTipo === "parcelado" && <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: t.dim }}>em <input type="number" min="2" max="12" value={parcelas} onChange={(e) => setParcelas(Math.max(2, Number(e.target.value) || 2))} style={{ ...fieldStyle(t), width: 60, padding: "6px 8px" }} /> x</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Proposta — serviços fixos</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {voltarBtn}
          <button onClick={baixarProposta} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><FileText size={15} /> Baixar proposta (PDF)</button>
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 18px" }}>Montada com os serviços contratados e os honorários da precificação.</p>
      {gerado && (
        <div style={{ background: t.accentSoft, border: `1px solid ${t.accent}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: theme === "dark" ? t.text : t.accent }}>
          Proposta gerada e baixada (.html no modelo Attentive). Abra o arquivo e use o botão “Salvar / Imprimir PDF” no topo, ou Ctrl/Cmd + P → Salvar como PDF.
        </div>
      )}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "24px 26px", maxWidth: 760 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: t.faint, letterSpacing: ".04em", textTransform: "uppercase" }}>Grupo Attentive • Gestão Empresarial</div>
        <div style={{ fontSize: 21, fontWeight: 700, margin: "8px 0 2px" }}>Proposta Comercial — {pacoteNome || "BPO Contábil"}</div>
        <div style={{ fontSize: 13, color: t.dim }}>Nº 2026.01 · {grupo.nome} · {grupo.status === "cliente" ? "Cliente" : "Prospect"}</div>
        <div style={{ height: 1, background: t.border, margin: "18px 0" }} />
        <div style={sec}>I – Escopo do trabalho</div>
        {entities.map((e) => {
          const tag = regimeTag(e.regime);
          const segs = e.segmentos && e.segmentos.length ? e.segmentos : SEG_ALL;
          const contratados = SERVICOS.filter((sv) => e.services[sv.key].enabled && (!pacoteKeys || pacoteKeys.includes(sv.key)));
          return (
            <div key={e.id} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{e.nome} <span style={{ fontSize: 11, color: t.faint, fontWeight: 500 }}>· {e.regime} · {e.tipo === "matriz" ? "Matriz" : "Filial"}</span></div>
              {contratados.length === 0 && <div style={{ fontSize: 12.5, color: t.dim, marginTop: 3 }}>Nenhum serviço contratado.</div>}
              {contratados.map((sv) => {
                const ativ = ((escopoFixos && escopoFixos[sv.key]) || []).filter((a) => a.regimes.includes(tag) && (a.segmentos || SEG_ALL).some((x) => segs.includes(x)));
                return (
                  <div key={sv.key} style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: t.accent }}>{sv.nome}</div>
                    {ativ.length ? ativ.map((a) => (
                      <div key={a.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: t.dim, padding: "2px 0" }}>
                        <span>• {a.nome}</span>
                        <span style={{ color: t.faint, marginLeft: 12, whiteSpace: "nowrap" }}>{a.periodicidade}</span>
                      </div>
                    )) : <div style={{ fontSize: 11.5, color: t.faint, fontStyle: "italic", padding: "2px 0" }}>Sem atividades para este regime.</div>}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div style={{ height: 1, background: t.border, margin: "18px 0" }} />
        <div style={sec}>III – Honorários profissionais</div>
        {entities.map((e) => (
          <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "4px 0", color: t.dim }}>
            <span>{e.nome}</span>
            <span style={{ fontWeight: 600, color: t.text, fontVariantNumeric: "tabular-nums" }}>{brl(calcDe(e.id).honorarioFinal)}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: "14px 16px", background: t.cardAlt, borderRadius: 10 }}>
          <div style={{ fontSize: 13, color: t.dim }}>Os honorários estimados para os serviços propostos serão de:</div>
          <div style={{ fontSize: 20, fontWeight: 700, margin: "4px 0 2px", fontVariantNumeric: "tabular-nums" }}>{brl(group.honorarioFinal)} <span style={{ fontSize: 13, fontWeight: 500, color: t.dim }}>/ mês</span></div>
          <div style={{ fontSize: 12.5, color: t.faint, fontStyle: "italic" }}>({extenso(group.honorarioFinal)})</div>
          <div style={{ fontSize: 12.5, color: t.text, marginTop: 12, marginBottom: 6, fontWeight: 600 }}>Forma de pagamento <span style={{ fontWeight: 400, color: t.faint }}>· editável</span></div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
            <button onClick={() => setPagFixo("À vista, no 5º dia útil do mês corrente à prestação do serviço.")} style={pill(false)}>5º dia útil — mês corrente</button>
            <button onClick={() => setPagFixo("À vista, no 5º dia útil do mês subsequente à prestação do serviço.")} style={pill(false)}>— mês subsequente</button>
          </div>
          <textarea value={pagFixo} onChange={(e) => setPagFixo(e.target.value)} rows={2} style={{ width: "100%", boxSizing: "border-box", background: t.card, color: t.text, border: `1px solid ${t.border}`, borderRadius: 8, padding: "8px 10px", fontSize: 12.5, fontFamily: "inherit", resize: "vertical" }} />
        </div>
      </div>
    </div>
  );
}

function fmtVig(m) { return m ? m.split("-").reverse().join("/") : ""; }

function Configuracoes({ t, vigencias, setVigencias, escopoFixos, setEscopoFixos, servicosDiversos, setServicosDiversos }) {
  const [importando, setImportando] = useState(false);
  const [nova, setNova] = useState({ vigencia: "", arquivo: "" });
  const [svcSel, setSvcSel] = useState("contabil");
  const ativs = escopoFixos[svcSel] || [];
  const setAtivs = (fn) => setEscopoFixos((prev) => ({ ...prev, [svcSel]: fn(prev[svcSel] || []) }));
  const updAtiv = (id, campo, val) => setAtivs((arr) => arr.map((a) => (a.id === id ? { ...a, [campo]: val } : a)));
  const toggleReg = (id, tg) => setAtivs((arr) => arr.map((a) => (a.id === id ? { ...a, regimes: a.regimes.includes(tg) ? a.regimes.filter((x) => x !== tg) : [...a.regimes, tg] } : a)));
  const toggleSeg = (id, tg) => setAtivs((arr) => arr.map((a) => (a.id === id ? { ...a, segmentos: (a.segmentos || SEG_ALL).includes(tg) ? (a.segmentos || []).filter((x) => x !== tg) : [...(a.segmentos || []), tg] } : a)));
  const addAtiv = () => setAtivs((arr) => [...arr, { id: "a" + Date.now(), nome: "Nova atividade", periodicidade: "Mensal", horasSistema: 1, regimes: ["simples", "presumido", "real"], segmentos: ["comercio", "servico", "industria"] }]);
  const delAtiv = (id) => setAtivs((arr) => arr.filter((a) => a.id !== id));
  const tornarVigente = (id) => setVigencias((p) => p.map((v) => ({ ...v, atual: v.id === id })));
  const add = () => {
    if (!nova.vigencia) return;
    setVigencias((p) => [{ id: "v" + Date.now(), vigencia: nova.vigencia, arquivo: nova.arquivo || "custos.xlsx", atual: true }, ...p.map((v) => ({ ...v, atual: false }))]);
    setNova({ vigencia: "", arquivo: "" }); setImportando(false);
  };
  const [dq, setDq] = useState("");
  const [edit, setEdit] = useState(null);
  const filtDiv = servicosDiversos.filter((s) => (s.desc + " " + s.dep + " " + s.tipo).toLowerCase().includes(dq.toLowerCase()));
  const novoDiv = () => setEdit({ n: "novo-" + Date.now(), desc: "", dep: "", tipo: "Fixo", valor: "", prazo: "", obs: "", escopo: "", _novo: true });
  const salvarDiv = () => {
    setServicosDiversos((prev) => {
      const item = { n: edit.n, desc: edit.desc, dep: edit.dep, tipo: edit.tipo, valor: edit.valor, prazo: edit.prazo, obs: edit.obs, escopo: edit.escopo };
      return prev.some((x) => x.n === edit.n) ? prev.map((x) => (x.n === edit.n ? item : x)) : [item, ...prev];
    });
    setEdit(null);
  };
  const excluirDiv = () => { setServicosDiversos((prev) => prev.filter((x) => x.n !== edit.n)); setEdit(null); };
  const uploadEscopo = (file) => {
    if (!file) return;
    if (/\.(txt|md|csv)$/i.test(file.name)) { const r = new FileReader(); r.onload = () => setEdit((e) => ({ ...e, escopo: String(r.result) })); r.readAsText(file); }
    else { setEdit((e) => ({ ...e, escopo: (e.escopo ? e.escopo + "\n\n" : "") + "[Modelo de escopo importado de " + file.name + " - o conteudo sera extraido na plataforma.]" })); }
  };

  const cardStyle = { background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 16 };
  const SECOES = [
    { id: "usuarios", nome: "Usuários", icon: Users },
    { id: "custo", nome: "Tabela de custo", icon: Calculator },
    { id: "questionario", nome: "Modelo do questionário", icon: ClipboardList },
    { id: "fixos", nome: "Serviços fixos", icon: BookText },
    { id: "diversos", nome: "Serviços diversos", icon: Table2 },
  ];
  const [secao, setSecao] = useState("usuarios");
  const PERFIS = ["Administrador", "Editor", "Visualizador"];
  const [usuarios, setUsuarios] = useState([{ id: "u1", nome: "Fernando Moreira", email: "fernando@grupoattentive.com.br", perfil: "Administrador" }]);
  const [novoU, setNovoU] = useState({ nome: "", email: "", perfil: "Editor" });
  const addUsuario = () => { if (!novoU.nome) return; setUsuarios((p) => [...p, { id: "u" + Date.now(), ...novoU }]); setNovoU({ nome: "", email: "", perfil: "Editor" }); };
  const removeUsuario = (id) => setUsuarios((p) => p.filter((u) => u.id !== id));
  const [modelosQuest, setModelosQuest] = useState([{ id: "q1", vigencia: "2026-06", arquivo: "Ficha_Tecnica_Outsourcing.pdf", atual: true }]);
  const [impQ, setImpQ] = useState(false);
  const [novoQ, setNovoQ] = useState({ vigencia: "", arquivo: "" });
  const addQ = () => { if (!novoQ.vigencia) return; setModelosQuest((p) => [{ id: "q" + Date.now(), vigencia: novoQ.vigencia, arquivo: novoQ.arquivo || "modelo.pdf", atual: true }, ...p.map((v) => ({ ...v, atual: false }))]); setNovoQ({ vigencia: "", arquivo: "" }); setImpQ(false); };
  const tornarVigenteQ = (id) => setModelosQuest((p) => p.map((v) => ({ ...v, atual: v.id === id })));

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Configurações</h1>
      <p style={{ fontSize: 13.5, color: t.dim, margin: "0 0 20px" }}>Selecione uma seção para gerenciar os cadastros.</p>
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 8, minWidth: 220, display: "flex", flexDirection: "column", gap: 2 }}>
          {SECOES.map((s) => { const on = secao === s.id; const Ic = s.icon; return (
            <button key={s.id} onClick={() => setSecao(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9, border: "none", background: on ? t.accentSoft : "transparent", color: on ? t.accent : t.dim, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}><Ic size={16} /> {s.nome}</button>
          ); })}
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>

          {secao === "usuarios" && (
            <div style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Usuários</div>
              <div style={{ fontSize: 12, color: t.faint, marginBottom: 14 }}>Quem tem acesso à plataforma e o nível de permissão de cada um.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 90px", gap: 8, alignItems: "end", marginBottom: 8 }}>
                <label><div style={lblS(t)}>Nome</div><input value={novoU.nome} onChange={(e) => setNovoU({ ...novoU, nome: e.target.value })} style={fieldStyle(t)} /></label>
                <label><div style={lblS(t)}>E-mail</div><input value={novoU.email} onChange={(e) => setNovoU({ ...novoU, email: e.target.value })} style={fieldStyle(t)} /></label>
                <label><div style={lblS(t)}>Perfil</div><select value={novoU.perfil} onChange={(e) => setNovoU({ ...novoU, perfil: e.target.value })} style={fieldStyle(t)}>{PERFIS.map((x) => <option key={x} value={x}>{x}</option>)}</select></label>
                <button onClick={addUsuario} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Plus size={15} /> Add</button>
              </div>
              {usuarios.map((u) => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span style={{ width: 34, height: 34, borderRadius: "50%", background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{(u.nome || "?").slice(0, 1).toUpperCase()}</span>
                    <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{u.nome}</div><div style={{ fontSize: 11.5, color: t.faint }}>{u.email || "—"}</div></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: t.cardAlt, color: t.dim, border: `1px solid ${t.border}` }}>{u.perfil}</span>
                    <button onClick={() => removeUsuario(u.id)} title="Remover" style={{ background: "transparent", border: "none", color: t.faint, cursor: "pointer", fontSize: 17, lineHeight: 1 }}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {secao === "custo" && (<>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Tabela de custo — vigências</div>
                {!importando && <button onClick={() => setImportando(true)} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Plus size={15} /> Importar custos</button>}
              </div>
              {importando && (
                <div style={{ border: `1px solid ${t.accent}`, borderRadius: 10, padding: "14px 16px", marginBottom: 14, display: "grid", gridTemplateColumns: "1fr 170px", gap: 12, alignItems: "end" }}>
                  <label><div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Planilha de custos (.xlsx)</div><input type="file" accept=".xlsx,.xls" onChange={(e) => setNova({ ...nova, arquivo: (e.target.files[0] && e.target.files[0].name) || "" })} style={{ fontSize: 12.5, color: t.dim }} /></label>
                  <label><div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Vigência a partir de</div><input type="month" value={nova.vigencia} onChange={(e) => setNova({ ...nova, vigencia: e.target.value })} style={fieldStyle(t)} /></label>
                  <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={() => { setImportando(false); setNova({ vigencia: "", arquivo: "" }); }} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                    <button onClick={add} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Adicionar vigência</button>
                  </div>
                </div>
              )}
              {vigencias.map((v) => (
                <div key={v.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Calculator size={15} /></span>
                    <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>Vigência {fmtVig(v.vigencia)}</div><div style={{ fontSize: 11.5, color: t.faint }}>{v.arquivo}</div></div>
                  </div>
                  {v.atual ? <span style={{ fontSize: 11.5, fontWeight: 700, color: t.green, background: t.cardAlt, border: `1px solid ${t.border}`, padding: "4px 12px", borderRadius: 20 }}>Vigente</span> : <button onClick={() => tornarVigente(v.id)} style={{ background: "transparent", color: t.accent, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Tornar vigente</button>}
                </div>
              ))}
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Custo/hora por serviço — tabela vigente</div>
              {SERVICOS.map((s) => (
                <div key={s.key} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: `1px solid ${t.borderSoft}`, fontSize: 13 }}>
                  <span style={{ color: t.dim }}>{s.nome}</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{brl(s.custoHora)}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: t.faint, marginTop: 12, lineHeight: 1.5 }}>Ao subir uma nova planilha, informe a vigência: ela passa a valer dali pra frente. Propostas feitas num mês continuam usando a tabela vigente naquele mês.</p>
            </div>
          </>)}

          {secao === "questionario" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Modelo do questionário</div>
                {!impQ && <button onClick={() => setImpQ(true)} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Plus size={15} /> Importar modelo</button>}
              </div>
              <div style={{ fontSize: 12, color: t.faint, marginBottom: 14, lineHeight: 1.5 }}>Suba o modelo do formulário (Ficha Técnica) com a vigência. Quando você mudar as perguntas, importe a nova versão aqui — os campos do cadastro manual são adaptados a ela.</div>
              {impQ && (
                <div style={{ border: `1px solid ${t.accent}`, borderRadius: 10, padding: "14px 16px", marginBottom: 14, display: "grid", gridTemplateColumns: "1fr 170px", gap: 12, alignItems: "end" }}>
                  <label><div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Modelo (.pdf, .docx, .xlsx)</div><input type="file" accept=".pdf,.docx,.xlsx" onChange={(e) => setNovoQ({ ...novoQ, arquivo: (e.target.files[0] && e.target.files[0].name) || "" })} style={{ fontSize: 12.5, color: t.dim }} /></label>
                  <label><div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Vigência a partir de</div><input type="month" value={novoQ.vigencia} onChange={(e) => setNovoQ({ ...novoQ, vigencia: e.target.value })} style={fieldStyle(t)} /></label>
                  <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={() => { setImpQ(false); setNovoQ({ vigencia: "", arquivo: "" }); }} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                    <button onClick={addQ} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Adicionar vigência</button>
                  </div>
                </div>
              )}
              {modelosQuest.map((v) => (
                <div key={v.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><ClipboardList size={15} /></span>
                    <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>Vigência {fmtVig(v.vigencia)}</div><div style={{ fontSize: 11.5, color: t.faint }}>{v.arquivo}</div></div>
                  </div>
                  {v.atual ? <span style={{ fontSize: 11.5, fontWeight: 700, color: t.green, background: t.cardAlt, border: `1px solid ${t.border}`, padding: "4px 12px", borderRadius: 20 }}>Vigente</span> : <button onClick={() => tornarVigenteQ(v.id)} style={{ background: "transparent", color: t.accent, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Tornar vigente</button>}
                </div>
              ))}
            </div>
          )}

          {secao === "fixos" && (
            <div style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Escopo dos serviços fixos</div>
              <div style={{ fontSize: 12, color: t.faint, marginBottom: 12 }}>Cada atividade aparece na proposta só nos regimes marcados (ex.: DEFIS só no Simples; ECF/EFD só Presumido e Real).</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {SERVICOS.map((s) => (
                  <button key={s.key} onClick={() => setSvcSel(s.key)} style={{ background: svcSel === s.key ? t.accent : "transparent", color: svcSel === s.key ? "#fff" : t.dim, border: `1px solid ${svcSel === s.key ? t.accent : t.border}`, borderRadius: 20, padding: "6px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{s.nome}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 86px 50px 116px 104px 22px", gap: 8, fontSize: 11, color: t.faint, fontWeight: 600, paddingBottom: 6 }}>
                <span>Atividade</span><span>Periodicidade</span><span style={{ textAlign: "right" }}>Horas</span><span style={{ textAlign: "center" }}>Regimes</span><span style={{ textAlign: "center" }}>Segmento</span><span></span>
              </div>
              {ativs.map((a) => (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: "1fr 86px 50px 116px 104px 22px", gap: 8, alignItems: "center", padding: "6px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                  <input value={a.nome} onChange={(e) => updAtiv(a.id, "nome", e.target.value)} style={{ ...fieldStyle(t), padding: "7px 10px", fontSize: 12.5 }} />
                  <select value={a.periodicidade} onChange={(e) => updAtiv(a.id, "periodicidade", e.target.value)} style={{ ...fieldStyle(t), padding: "7px 8px", fontSize: 12 }}>{PERIODOS.map((pp) => <option key={pp} value={pp}>{pp}</option>)}</select>
                  <input type="number" min="0" step="0.5" value={a.horasSistema} onChange={(e) => updAtiv(a.id, "horasSistema", Number(e.target.value) || 0)} style={{ ...fieldStyle(t), padding: "7px 8px", fontSize: 12, textAlign: "right" }} />
                  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>{REGIME_OPTS.map((r) => { const on = a.regimes.includes(r.tag); return <button key={r.tag} title={r.nome} onClick={() => toggleReg(a.id, r.tag)} style={{ width: 38, height: 30, borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${on ? t.accent : t.border}`, background: on ? t.accent : "transparent", color: on ? "#fff" : t.faint }}>{r.lbl}</button>; })}</div>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>{SEG_OPTS.map((r) => { const on = (a.segmentos || SEG_ALL).includes(r.tag); return <button key={r.tag} title={r.nome} onClick={() => toggleSeg(a.id, r.tag)} style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${on ? t.accent : t.border}`, background: on ? t.accent : "transparent", color: on ? "#fff" : t.faint }}>{r.lbl}</button>; })}</div>
                  <button onClick={() => delAtiv(a.id)} title="Remover" style={{ background: "transparent", border: "none", color: t.faint, cursor: "pointer", fontSize: 17, lineHeight: 1 }}>×</button>
                </div>
              ))}
              <button onClick={addAtiv} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, background: "transparent", color: t.accent, border: `1px dashed ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Plus size={14} /> Adicionar atividade</button>
            </div>
          )}

          {secao === "diversos" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Serviços diversos (cadastro)</div>
                <button onClick={novoDiv} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Plus size={15} /> Novo serviço</button>
              </div>
              <div style={{ fontSize: 12, color: t.faint, marginBottom: 12 }}>Cadastre o serviço, o preço, o prazo e o modelo de escopo. O que você altera aqui reflete na tela de Proposta de serviços diversos — {servicosDiversos.length} itens.</div>
              <input value={dq} onChange={(e) => setDq(e.target.value)} placeholder="Buscar serviço..." style={{ ...fieldStyle(t), maxWidth: 320, marginBottom: 4 }} />
              <div style={{ maxHeight: 360, overflowY: "auto" }}>
                {filtDiv.map((s) => (
                  <div key={s.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "9px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 430 }}>{s.desc}</div>
                      <div style={{ fontSize: 11, color: t.faint, marginTop: 2 }}>{s.tipo} · {s.valor || "—"}{s.dep ? " · " + s.dep : ""}{s.escopo ? " · escopo ✓" : ""}</div>
                    </div>
                    <button onClick={() => setEdit({ ...s })} style={{ background: "transparent", color: t.accent, border: `1px solid ${t.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Editar</button>
                  </div>
                ))}
                {filtDiv.length === 0 && <div style={{ padding: "14px 0", color: t.faint, fontSize: 12.5 }}>Nenhum serviço.</div>}
              </div>
            </div>
          )}

        </div>
      </div>

      {edit && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,11,20,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50, overflowY: "auto" }} onClick={() => setEdit(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 24px", width: "100%", maxWidth: 640, boxShadow: "0 24px 70px rgba(0,0,0,.45)", margin: "auto" }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: t.faint, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 12 }}>{edit._novo ? "Novo serviço diverso" : "Editar serviço diverso"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px", gap: 10, marginBottom: 10 }}>
              <label style={{ gridColumn: "1 / -1" }}><div style={lblS(t)}>Descrição</div><input value={edit.desc} onChange={(e) => setEdit({ ...edit, desc: e.target.value })} style={fieldStyle(t)} /></label>
              <label><div style={lblS(t)}>Departamento</div><input value={edit.dep} onChange={(e) => setEdit({ ...edit, dep: e.target.value })} style={fieldStyle(t)} /></label>
              <label><div style={lblS(t)}>Tipo</div><select value={edit.tipo} onChange={(e) => setEdit({ ...edit, tipo: e.target.value })} style={fieldStyle(t)}>{["Fixo", "Hora", "Percentual", "Por pessoa", "Variável"].map((x) => <option key={x} value={x}>{x}</option>)}</select></label>
              <label><div style={lblS(t)}>Valor / preço</div><input value={edit.valor} onChange={(e) => setEdit({ ...edit, valor: e.target.value })} style={fieldStyle(t)} placeholder="R$ 0,00" /></label>
              <label style={{ gridColumn: "1 / -1" }}><div style={lblS(t)}>Prazo</div><input value={edit.prazo} onChange={(e) => setEdit({ ...edit, prazo: e.target.value })} style={fieldStyle(t)} placeholder="ex.: 5 dias úteis" /></label>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "6px 0 5px" }}>
              <div style={lblS(t)}>Modelo de escopo</div>
              <div style={{ display: "flex", gap: 8 }}>
                <label style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: t.accent, border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  ↑ Subir arquivo
                  <input type="file" accept=".txt,.md,.csv,.docx,.pdf" onChange={(e) => uploadEscopo(e.target.files[0])} style={{ display: "none" }} />
                </label>
                <button onClick={() => setEdit({ ...edit, escopo: escopoModelo(edit) })} style={{ background: "transparent", color: t.accent, border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>↻ Gerar do padrão</button>
              </div>
            </div>
            <textarea value={edit.escopo} onChange={(e) => setEdit({ ...edit, escopo: e.target.value })} rows={7} placeholder="Digite o escopo ou suba um arquivo..." style={{ width: "100%", boxSizing: "border-box", background: t.cardAlt, color: t.text, border: `1px solid ${t.border}`, borderRadius: 10, padding: "11px 13px", fontSize: 13, lineHeight: 1.55, fontFamily: "inherit", resize: "vertical" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, gap: 8 }}>
              {!edit._novo ? <button onClick={excluirDiv} style={{ background: "transparent", color: t.red, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Excluir</button> : <span />}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEdit(null)} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                <button onClick={salvarDiv} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Precificacao() {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [propostasFixas, setPropostasFixas] = useState([
    { id: "pf1", grupo: { nome: "Grupo MTBR", status: "prospect" }, entities: SEED_ENTITIES, selId: "e1", pacote: "contabil", status: "andamento", criadaEm: "09/06/2026" },
  ]);
  const [propFixaSel, setPropFixaSel] = useState("pf1");
  const [fixoView, setFixoView] = useState("home");
  const [fixoTab, setFixoTab] = useState("andamento");
  const [novaProp, setNovaProp] = useState(false);
  const [novoPacote, setNovoPacote] = useState("contabil");
  const [dragOver, setDragOver] = useState(false);
  const [enviarSel, setEnviarSel] = useState(null);
  const [enviarEmail, setEnviarEmail] = useState("");
  const [enviarWhats, setEnviarWhats] = useState("");
  const [canalEmail, setCanalEmail] = useState(true);
  const [canalWhats, setCanalWhats] = useState(false);
  const [propostasDiversas, setPropostasDiversas] = useState([]);
  const [propDivSel, setPropDivSel] = useState(null);
  const [diversoView, setDiversoView] = useState("home");
  const [diversoTab, setDiversoTab] = useState("andamento");
  const [novoDivModal, setNovoDivModal] = useState(false);
  const [divCliente, setDivCliente] = useState("");
  const [divCnpj, setDivCnpj] = useState("");
  const [confirmEx, setConfirmEx] = useState(null);
  const [params, setParams] = useState({ imposto: 17, admPct: 20, mktPct: 5 });
  const propFixa = propostasFixas.find((p) => p.id === propFixaSel) || propostasFixas[0];
  const entities = propFixa ? propFixa.entities : [];
  const grupo = propFixa ? propFixa.grupo : { nome: "", status: "prospect" };
  const selId = propFixa ? (propFixa.selId || (entities[0] && entities[0].id)) : null;
  const patchProp = (patch) => setPropostasFixas((prev) => prev.map((p) => p.id === propFixaSel ? { ...p, ...(typeof patch === "function" ? patch(p) : patch) } : p));
  const setEntities = (u) => patchProp((p) => ({ entities: typeof u === "function" ? u(p.entities) : u }));
  const setGrupo = (u) => patchProp((p) => ({ grupo: typeof u === "function" ? u(p.grupo) : u }));
  const setSelId = (id) => patchProp((p) => ({ selId: typeof id === "function" ? id(p.selId) : id }));
  const pacoteAtual = PACOTES.find((x) => x.id === ((propFixa && propFixa.pacote) || "contabil")) || PACOTES[0];
  const pacoteKeys = pacoteAtual.keys;
  const [expanded, setExpanded] = useState({ fiscal: true });
  const [addModal, setAddModal] = useState(false);
  const [addStep, setAddStep] = useState("tipo");
  const [addTipo, setAddTipo] = useState("filial");
  const [cadForm, setCadForm] = useState(BLANK_CAD);
  const [formAberto, setFormAberto] = useState(false);
  const [saved, setSaved] = useState(false);
  const [page, setPage] = useState("fixos");
  const [avulso, setAvulso] = useState(null);
  const [vigencias, setVigencias] = useState([{ id: "v1", vigencia: "2026-06", arquivo: "01_FT_-_Modelo.xlsx", atual: true }]);
  const [escopoFixos, setEscopoFixos] = useState(escopoSeed);
  const [servicosDiversos, setServicosDiversos] = useState(() => SERVICOS_DIVERSOS.slice(1).map((x) => ({ ...x, escopo: "" })));

  const t = THEMES[theme];
  const isWide = width >= 1060;
  const railOnly = width < 880;

  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const persist = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const perEntity = useMemo(() => entities.map((e) => ({ id: e.id, calc: computeEntity(e, params, escopoFixos, pacoteKeys) })), [entities, params, escopoFixos, pacoteKeys]);
  const group = useMemo(() => {
    const acc = { honorarioFinal: 0, lucro: 0, rol: 0, custo: 0, mc: 0, impostos: 0, totalHoras: 0 };
    for (const p of perEntity) { acc.honorarioFinal += p.calc.honorarioFinal; acc.lucro += p.calc.lucro; acc.rol += p.calc.rol; acc.custo += p.calc.custo; acc.mc += p.calc.mc; acc.impostos += p.calc.impostos; acc.totalHoras += p.calc.totalHoras; }
    acc.lucroPct = acc.rol ? acc.lucro / acc.rol : 0;
    acc.mcPct = acc.rol ? acc.mc / acc.rol : 0;
    return acc;
  }, [perEntity]);

  const sel = entities.find((e) => e.id === selId) || entities[0];
  const selCalc = computeEntity(sel, params, escopoFixos, pacoteKeys);
  const consolidado = selId === "consolidado" && entities.length > 1;
  const groupPorServico = useMemo(() => {
    const out = {};
    for (const s of SERVICOS) {
      let honorarioImp = 0, horas = 0, anyEnabled = false;
      for (const pe of perEntity) { const ps = pe.calc.porServico[s.key]; if (ps && ps.enabled) { honorarioImp += ps.honorarioImp; horas += ps.horas; anyEnabled = true; } }
      out[s.key] = { honorarioImp, horas, enabled: anyEnabled };
    }
    return out;
  }, [perEntity]);
  const view = consolidado ? group : selCalc;
  const modalEy = { fontSize: 11.5, fontWeight: 600, color: t.faint, textTransform: "uppercase", letterSpacing: ".04em" };
  const choiceBtn = { flex: 1, padding: "16px 12px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${t.border}`, background: t.cardAlt, color: t.text };
  const setCad = (k, v) => setCadForm((f) => ({ ...f, [k]: v }));
  const campoInput = (c) => {
    const val = cadForm[c.k];
    if (c.t === "textarea") return <textarea value={val || ""} onChange={(e) => setCad(c.k, e.target.value)} rows={2} style={{ ...fieldStyle(t), resize: "vertical" }} />;
    if (c.t === "number") return <input type="number" value={val} onChange={(e) => setCad(c.k, e.target.value)} style={fieldStyle(t)} />;
    if (c.t === "select") return <select value={val} onChange={(e) => setCad(c.k, e.target.value)} style={fieldStyle(t)}>{c.opts.map((o) => <option key={o} value={o}>{o}</option>)}</select>;
    if (c.t === "simnao") return <select value={val} onChange={(e) => setCad(c.k, e.target.value)} style={fieldStyle(t)}><option>Não</option><option>Sim</option></select>;
    if (c.t === "multi") return <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{c.opts.map((o) => { const on = (val || []).includes(o); return <button key={o} onClick={() => setCad(c.k, on ? val.filter((x) => x !== o) : [...(val || []), o])} style={{ padding: "6px 11px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${on ? t.accent : t.border}`, background: on ? t.accent : "transparent", color: on ? "#fff" : t.dim }}>{o}</button>; })}</div>;
    return <input value={val || ""} onChange={(e) => setCad(c.k, e.target.value)} style={fieldStyle(t)} />;
  };

  const mutateEntity = (id, fn) => setEntities((prev) => prev.map((e) => (e.id === id ? fn(structuredClone(e)) : e)));
  const updateEntity = (id, field, value) => mutateEntity(id, (e) => { e[field] = field === "faturamento" ? (Number(value) || 0) : value; return e; });
  const toggleEntitySeg = (id, tg) => mutateEntity(id, (e) => { const cur = e.segmentos || []; e.segmentos = cur.includes(tg) ? cur.filter((x) => x !== tg) : [...cur, tg]; return e; });
  const importarFormulario = (id, file) => { if (!file) return; mutateEntity(id, (e) => { e.formulario = { ...SAMPLE_FORM, arquivo: file.name || SAMPLE_FORM.arquivo }; return e; }); setFormAberto(true); };
  const toggleService = (id, k) => mutateEntity(id, (e) => { e.services[k].enabled = !e.services[k].enabled; return e; });
  const updateService = (id, k, f, v) => mutateEntity(id, (e) => { e.services[k][f] = Number(v) || 0; return e; });
  const updateHoras = (id, k, aid, v) => mutateEntity(id, (e) => { if (!e.services[k].horasTime) e.services[k].horasTime = {}; e.services[k].horasTime[aid] = Number(v) || 0; return e; });

  const criarEmpresa = (tipo, dados, arquivo) => {
    const ent = {
      id: uid(), tipo, nome: dados.razaoSocial || "Empresa",
      regime: dados.regime || "Simples Nacional",
      segmentos: segmentosDeAtividades(dados.atividades),
      faturamento: Number(dados.faturamentoMensal) || 0,
      formulario: { ...dados, arquivo: arquivo || dados.arquivo || "Cadastro manual" },
      services: buildServices({ enabled: mapServicos(dados.servicosContratados) }),
    };
    if (novaProp) {
      const pid = uid();
      setPropostasFixas((prev) => [...prev, { id: pid, grupo: { nome: dados.razaoSocial || "Novo cliente", status: "prospect" }, entities: [{ ...ent, tipo: "matriz" }], selId: ent.id, pacote: novoPacote, status: "andamento", criadaEm: new Date().toLocaleDateString("pt-BR") }]);
      setPropFixaSel(pid); setFixoView("editor");
    } else {
      if (ent.nome === "Empresa") ent.nome = tipo === "filial" ? `${grupo.nome} — Filial ${String(entities.filter((e) => e.tipo === "filial").length + 2).padStart(2, "0")}` : `Empresa ${entities.filter((e) => e.tipo === "matriz").length + 1}`;
      setEntities((p) => [...p, ent]); setSelId(ent.id);
    }
    setNovaProp(false); setAddModal(false);
  };
  const criarImportando = (tipo, file) => criarEmpresa(tipo, SAMPLE_FORM, (file && file.name) || SAMPLE_FORM.arquivo);
  const criarManual = () => criarEmpresa(addTipo, cadForm, "Cadastro manual");
  const novaPropostaFixo = () => { setNovaProp(true); setNovoPacote("contabil"); setAddTipo("matriz"); setAddStep("pacote"); setAddModal(true); };
  const finalizarProp = () => { patchProp({ status: "feita" }); abrirEnvio(propFixa); setFixoView("home"); setFixoTab("feitas"); };
  const excluirProp = (id) => { const p = propostasFixas.find((x) => x.id === id); setConfirmEx({ lista: "fixa", id, nome: p ? p.grupo.nome : "" }); };
  const abrirEnvio = (prop, lista = "fixa") => {
    let email = "", fone = "";
    if (lista === "fixa") { const m = prop.entities.find((e) => e.tipo === "matriz") || prop.entities[0]; email = (m && m.formulario && m.formulario.email) || ""; fone = (m && m.formulario && (m.formulario.whatsapp || m.formulario.telefone)) || ""; }
    else { email = prop.email || ""; fone = prop.telefone || ""; }
    setEnviarEmail(email); setEnviarWhats(fone); setCanalEmail(true); setCanalWhats(false);
    setEnviarSel({ lista, id: prop.id });
  };
  const enviarProposta = () => {
    const canais = [canalEmail && "E-mail", canalWhats && "WhatsApp"].filter(Boolean).join(" + ");
    if (canalWhats && enviarWhats) {
      const num = enviarWhats.replace(/\D/g, "");
      const alvo = num.startsWith("55") ? num : "55" + num;
      const nome = enviarSel && enviarSel.lista === "diversa"
        ? ((propostasDiversas.find((p) => p.id === enviarSel.id) || {}).cliente || "")
        : (((propostasFixas.find((p) => p.id === enviarSel.id) || {}).grupo || {}).nome || "");
      const msg = encodeURIComponent(`Olá! Segue a proposta comercial do Grupo Attentive${nome ? " para " + nome : ""}. Qualquer dúvida, estou à disposição.`);
      try { window.open(`https://wa.me/${alvo}?text=${msg}`, "_blank"); } catch (e) {}
    }
    const patch = (p) => ({ ...p, status: "enviada", enviadaEm: new Date().toLocaleDateString("pt-BR"), enviadaPara: enviarEmail, enviadaWhats: enviarWhats, enviadaPor: canais });
    if (enviarSel && enviarSel.lista === "diversa") setPropostasDiversas((prev) => prev.map((p) => p.id === enviarSel.id ? patch(p) : p));
    else setPropostasFixas((prev) => prev.map((p) => p.id === (enviarSel && enviarSel.id) ? patch(p) : p));
    setEnviarSel(null);
  };
  const propDiv = propostasDiversas.find((p) => p.id === propDivSel);
  const patchDiv = (patch) => setPropostasDiversas((prev) => prev.map((p) => p.id === propDivSel ? { ...p, ...(typeof patch === "function" ? patch(p) : patch) } : p));
  const clientesCadastrados = useMemo(() => {
    const arr = [];
    for (const p of propostasFixas) { const m = p.entities.find((e) => e.tipo === "matriz") || p.entities[0]; arr.push({ nome: p.grupo.nome, cnpj: (m && m.formulario && m.formulario.cnpj) || "" }); }
    for (const p of propostasDiversas) arr.push({ nome: p.cliente, cnpj: p.cnpj || "" });
    const seen = new Set(), out = [];
    for (const c of arr) { const k = (c.nome || "").toLowerCase(); if (c.nome && !seen.has(k)) { seen.add(k); out.push(c); } }
    return out;
  }, [propostasFixas, propostasDiversas]);
  const criarPropDiversa = () => {
    const pid = uid();
    setPropostasDiversas((prev) => [...prev, { id: pid, cliente: divCliente || "Novo cliente", cnpj: divCnpj, status: "andamento", itens: [], criadaEm: new Date().toLocaleDateString("pt-BR") }]);
    setPropDivSel(pid); setDiversoView("editor"); setNovoDivModal(false); setDivCliente(""); setDivCnpj("");
  };
  const addItemDiverso = (item) => patchDiv((p) => p.itens.some((x) => x.n === item.n) ? {} : { itens: [...p.itens, { ...item, escopo: item.escopo || escopoModelo(item) }] });
  const removeItemDiverso = (n) => patchDiv((p) => ({ itens: p.itens.filter((x) => x.n !== n) }));
  const finalizarDiversa = () => { patchDiv({ status: "feita" }); abrirEnvio(propDiv, "diversa"); setDiversoView("home"); setDiversoTab("feitas"); };
  const excluirDiversa = (id) => { const p = propostasDiversas.find((x) => x.id === id); setConfirmEx({ lista: "diversa", id, nome: p ? p.cliente : "" }); };
  const confirmarExcluir = () => {
    if (!confirmEx) return;
    const { lista, id } = confirmEx;
    if (lista === "diversa") { setPropostasDiversas((prev) => prev.filter((p) => p.id !== id)); if (id === propDivSel) setPropDivSel(null); }
    else { setPropostasFixas((prev) => prev.filter((p) => p.id !== id)); if (id === propFixaSel) { const rest = propostasFixas.filter((p) => p.id !== id); setPropFixaSel(rest[0] ? rest[0].id : null); } }
    setConfirmEx(null);
  };
  const totalDiv = (p) => (p.itens || []).reduce((s, it) => s + parseValor(it.valor), 0);
  const removeEntity = (id) => {
    setEntities((p) => p.filter((e) => e.id !== id));
    if (selId === id) setSelId(entities[0].id);
  };

  const navPrincipal = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "fixos", icon: Calculator, label: "Proposta de serviços fixos" },
    { id: "diversos", icon: Table2, label: "Proposta de serviços diversos" },
  ];
  const navSistema = [
    { id: "configuracoes", icon: Settings, label: "Configurações" },
    { id: "ajuda", icon: HelpCircle, label: "Ajuda" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: t.appBg, color: t.text, fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <aside style={{ width: railOnly ? 64 : 232, background: SIDE.bg, borderRight: `1px solid ${SIDE.border}`, display: "flex", flexDirection: "column", padding: railOnly ? "16px 10px" : "16px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: railOnly ? "0 0 18px" : "2px 6px 20px", justifyContent: railOnly ? "center" : "flex-start" }}>
          {railOnly
            ? <img src={LOGO_IC} alt="Attentive" style={{ width: 34, height: 34, borderRadius: 9 }} />
            : <img src={LOGO_WM} alt="Attentive" style={{ height: 26 }} />}
        </div>
        {!railOnly && <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", color: SIDE.faint, padding: "0 6px 8px" }}>PRINCIPAL</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {navPrincipal.map((n) => <NavItem key={n.id} icon={n.icon} label={n.label} active={page === n.id} collapsed={railOnly} onClick={() => setPage(n.id)} />)}
        </div>
        {!railOnly ? <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", color: SIDE.faint, padding: "18px 6px 8px" }}>SISTEMA</div> : <div style={{ height: 14 }} />}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {navSistema.map((n) => <NavItem key={n.id} icon={n.icon} label={n.label} active={page === n.id} collapsed={railOnly} onClick={() => setPage(n.id)} />)}
        </div>
        <div style={{ flex: 1 }} />
        <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ display: "flex", alignItems: "center", gap: 9, padding: railOnly ? "10px 0" : "9px 12px", justifyContent: railOnly ? "center" : "space-between", borderRadius: 10, cursor: "pointer", background: SIDE.toggle, border: `1px solid ${SIDE.border}`, color: SIDE.dim, fontSize: 13 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            {!railOnly && (theme === "dark" ? "Escuro" : "Claro")}
          </span>
          {!railOnly && <span style={{ width: 34, height: 20, borderRadius: 10, background: theme === "dark" ? SIDE.accent : "#3a4257", position: "relative", transition: "background .15s" }}>
            <span style={{ position: "absolute", top: 2, left: theme === "dark" ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
          </span>}
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ background: t.head, borderBottom: `1px solid ${t.border}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Building2 size={18} color={t.accent} />
          <input value={grupo.nome} onChange={(e) => setGrupo({ ...grupo, nome: e.target.value })}
            style={{ background: "transparent", border: "none", color: t.text, fontSize: 15, fontWeight: 700, outline: "none", fontFamily: "inherit", width: 220 }} />
          <span onClick={() => setGrupo({ ...grupo, status: grupo.status === "prospect" ? "cliente" : "prospect" })}
            style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: grupo.status === "cliente" ? t.accentSoft : t.cardAlt, color: grupo.status === "cliente" ? t.accent : t.dim, border: `1px solid ${t.border}` }}>
            {grupo.status === "cliente" ? "Cliente" : "Prospect"}
          </span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12.5, color: t.dim }}>Competência 06/2026</span>
          <button onClick={persist}
            style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            {saved ? <Check size={15} /> : <Save size={15} />} {saved ? "Salvo" : "Salvar"}
          </button>
        </header>

        <div style={{ padding: "22px 24px", overflowY: "auto" }}>
          {page === "diversos" && (<>
            {diversoView === "home" && (
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Proposta de serviços diversos</h1>
                <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 20px" }}>Crie uma nova proposta, continue uma em elaboração ou consulte as finalizadas.</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
                  <button onClick={() => setNovoDivModal(true)} style={{ display: "flex", alignItems: "center", gap: 9, background: t.accent, color: "#fff", border: "none", borderRadius: 12, padding: "16px 22px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}><Plus size={18} /> Nova proposta</button>
                  <button onClick={() => setDiversoTab("andamento")} style={{ display: "flex", alignItems: "center", gap: 9, background: diversoTab === "andamento" ? t.accentSoft : t.card, color: diversoTab === "andamento" ? t.accent : t.text, border: `1px solid ${diversoTab === "andamento" ? t.accent : t.border}`, borderRadius: 12, padding: "16px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Clock size={17} /> Propostas em elaboração <span style={{ fontSize: 12, fontWeight: 700, color: t.faint }}>{propostasDiversas.filter((p) => p.status === "andamento").length}</span></button>
                  <button onClick={() => setDiversoTab("feitas")} style={{ display: "flex", alignItems: "center", gap: 9, background: diversoTab === "feitas" ? t.accentSoft : t.card, color: diversoTab === "feitas" ? t.accent : t.text, border: `1px solid ${diversoTab === "feitas" ? t.accent : t.border}`, borderRadius: 12, padding: "16px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Check size={17} /> Propostas feitas <span style={{ fontSize: 12, fontWeight: 700, color: t.faint }}>{propostasDiversas.filter((p) => p.status === "feita" || p.status === "enviada").length}</span></button>
                </div>
                <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ padding: "12px 18px", borderBottom: `1px solid ${t.border}`, fontSize: 13, fontWeight: 700, color: t.dim }}>{diversoTab === "feitas" ? "Propostas finalizadas" : "Propostas em elaboração"}</div>
                  {propostasDiversas.filter((p) => diversoTab === "feitas" ? (p.status === "feita" || p.status === "enviada") : p.status === "andamento").length === 0 && (
                    <div style={{ padding: "26px 18px", fontSize: 13, color: t.faint, textAlign: "center" }}>Nenhuma proposta {diversoTab === "feitas" ? "finalizada" : "em elaboração"} ainda. Clique em “Nova proposta” para começar.</div>
                  )}
                  {propostasDiversas.filter((p) => diversoTab === "feitas" ? (p.status === "feita" || p.status === "enviada") : p.status === "andamento").map((p) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "13px 18px", borderTop: `1px solid ${t.borderSoft}` }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{p.cliente}</div>
                        <div style={{ fontSize: 11.5, color: t.faint }}>{p.cnpj ? p.cnpj + " · " : ""}{(p.itens || []).length} serviço(s) · criada em {p.criadaEm}{p.status === "enviada" && p.enviadaEm ? ` · enviada ${p.enviadaEm}` : ""} · {brl(totalDiv(p))}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: p.status === "enviada" ? "rgba(91,140,255,.16)" : p.status === "feita" ? "rgba(34,197,94,.14)" : t.cardAlt, color: p.status === "enviada" ? t.accent : p.status === "feita" ? t.green : t.dim, border: `1px solid ${t.border}` }}>{p.status === "enviada" ? "Enviada" : p.status === "feita" ? "Finalizada" : "Em elaboração"}</span>
                        <button onClick={() => { setPropDivSel(p.id); setDiversoView("editor"); }} style={{ background: t.accentSoft, color: t.accent, border: `1px solid ${t.accent}`, borderRadius: 9, padding: "7px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Abrir</button>
                        {(p.status === "feita" || p.status === "enviada") && (
                          <button onClick={() => abrirEnvio(p, "diversa")} style={{ display: "flex", alignItems: "center", gap: 6, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "7px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Send size={14} /> {p.status === "enviada" ? "Reenviar" : "Enviar"}</button>
                        )}
                        {p.status === "andamento" && (
                          <button onClick={() => excluirDiversa(p.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "transparent", color: t.red, border: `1px solid ${t.border}`, borderRadius: 9, padding: "7px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Trash2 size={13} /> Excluir</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {diversoView === "editor" && propDiv && (
              <div>
                <button onClick={() => setDiversoView("home")} style={{ background: "transparent", border: "none", color: t.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 10 }}>← Propostas de serviços diversos</button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{propDiv.cliente}</h1>
                    <div style={{ fontSize: 12.5, color: t.faint, marginTop: 2 }}>{propDiv.cnpj || "CNPJ não informado"} · serviços diversos</div>
                  </div>
                  <button onClick={finalizarDiversa} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Check size={15} /> Finalizar proposta</button>
                </div>
                <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>Itens da proposta <span style={{ color: t.faint, fontWeight: 600 }}>· {(propDiv.itens || []).length}</span></div>
                  {(propDiv.itens || []).length === 0 ? (
                    <div style={{ fontSize: 12.5, color: t.faint }}>Nenhum serviço adicionado. Use o catálogo abaixo para incluir serviços nesta proposta.</div>
                  ) : (<>
                    {propDiv.itens.map((it) => (
                      <div key={it.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "9px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: t.text }}>{it.desc}</div>
                          <div style={{ fontSize: 11, color: t.faint }}>{it.dep}{it.tipo ? " · " + it.tipo : ""}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{it.valor}</span>
                          <button onClick={() => { setAvulso({ ...it, cliente: propDiv.cliente, cnpj: propDiv.cnpj }); setPage("propostas"); }} style={{ background: t.accentSoft, color: t.accent, border: `1px solid ${t.accent}`, borderRadius: 8, padding: "5px 10px", fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Ver proposta</button>
                          <button onClick={() => removeItemDiverso(it.n)} title="Remover" style={{ background: "transparent", color: t.faint, border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0 0", marginTop: 4, borderTop: `2px solid ${t.border}`, fontSize: 14, fontWeight: 800 }}>
                      <span>Total estimado</span><span style={{ color: t.accent, fontVariantNumeric: "tabular-nums" }}>{brl(totalDiv(propDiv))}</span>
                    </div>
                  </>)}
                </div>
                <TabelaPrecos t={t} data={servicosDiversos} embedded onGerar={addItemDiverso} actionLabel="Adicionar" />
              </div>
            )}
            {novoDivModal && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(8,11,20,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 60 }} onClick={() => setNovoDivModal(false)}>
                <div onClick={(e) => e.stopPropagation()} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 24px", width: "100%", maxWidth: 460, boxShadow: "0 24px 70px rgba(0,0,0,.45)" }}>
                  <div style={modalEy}>Nova proposta — serviços diversos</div>
                  <div style={{ fontSize: 15, fontWeight: 600, margin: "6px 0 16px" }}>Quem é o cliente?</div>
                  {clientesCadastrados.length > 0 && (
                    <label style={{ display: "block", marginBottom: 12 }}>
                      <div style={lblS(t)}>Cliente já cadastrado</div>
                      <select onChange={(e) => { const c = clientesCadastrados[e.target.value]; if (c) { setDivCliente(c.nome); setDivCnpj(c.cnpj); } }} style={fieldStyle(t)}>
                        <option value="">Selecionar…</option>
                        {clientesCadastrados.map((c, i) => <option key={i} value={i}>{c.nome}{c.cnpj ? " — " + c.cnpj : ""}</option>)}
                      </select>
                    </label>
                  )}
                  <label style={{ display: "block", marginBottom: 12 }}><div style={lblS(t)}>Cliente</div><input value={divCliente} onChange={(e) => setDivCliente(e.target.value)} placeholder="Nome do cliente" style={fieldStyle(t)} /></label>
                  <label style={{ display: "block" }}><div style={lblS(t)}>CNPJ</div><input value={divCnpj} onChange={(e) => setDivCnpj(e.target.value)} placeholder="00.000.000/0000-00" style={fieldStyle(t)} /></label>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
                    <button onClick={() => setNovoDivModal(false)} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                    <button onClick={criarPropDiversa} disabled={!divCliente} style={{ background: divCliente ? t.accent : t.cardAlt, color: divCliente ? "#fff" : t.faint, border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: divCliente ? "pointer" : "default", fontFamily: "inherit" }}>Criar proposta</button>
                  </div>
                </div>
              </div>
            )}
          </>)}
          {page === "propostas" && <Propostas key={avulso ? ("d" + avulso.n) : "grupo"} t={t} theme={theme} grupo={grupo} entities={entities} perEntity={perEntity} group={group} avulso={avulso} escopoFixos={escopoFixos} pacoteKeys={avulso ? null : pacoteKeys} pacoteNome={avulso ? null : pacoteAtual.nome} onVoltar={() => setPage(avulso ? "diversos" : "fixos")} />}
          {page === "configuracoes" && <Configuracoes t={t} vigencias={vigencias} setVigencias={setVigencias} escopoFixos={escopoFixos} setEscopoFixos={setEscopoFixos} servicosDiversos={servicosDiversos} setServicosDiversos={setServicosDiversos} />}
          {PAGE_TITLES[page] && <EmBreve t={t} titulo={PAGE_TITLES[page]} />}
          {page === "fixos" && (<>
          {(fixoView === "home" || !propFixa) && (
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Proposta de serviços fixos</h1>
              <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 20px" }}>Crie uma nova proposta, continue uma em andamento ou consulte as finalizadas.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
                <button onClick={novaPropostaFixo} style={{ display: "flex", alignItems: "center", gap: 9, background: t.accent, color: "#fff", border: "none", borderRadius: 12, padding: "16px 22px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}><Plus size={18} /> Nova proposta</button>
                <button onClick={() => setFixoTab("andamento")} style={{ display: "flex", alignItems: "center", gap: 9, background: fixoTab === "andamento" ? t.accentSoft : t.card, color: fixoTab === "andamento" ? t.accent : t.text, border: `1px solid ${fixoTab === "andamento" ? t.accent : t.border}`, borderRadius: 12, padding: "16px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Clock size={17} /> Propostas em andamento <span style={{ fontSize: 12, fontWeight: 700, color: t.faint }}>{propostasFixas.filter((p) => p.status === "andamento").length}</span></button>
                <button onClick={() => setFixoTab("feitas")} style={{ display: "flex", alignItems: "center", gap: 9, background: fixoTab === "feitas" ? t.accentSoft : t.card, color: fixoTab === "feitas" ? t.accent : t.text, border: `1px solid ${fixoTab === "feitas" ? t.accent : t.border}`, borderRadius: 12, padding: "16px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Check size={17} /> Propostas feitas <span style={{ fontSize: 12, fontWeight: 700, color: t.faint }}>{propostasFixas.filter((p) => p.status === "feita").length}</span></button>
              </div>
              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: `1px solid ${t.border}`, fontSize: 13, fontWeight: 700, color: t.dim }}>{fixoTab === "feitas" ? "Propostas finalizadas" : "Propostas em andamento"}</div>
                {propostasFixas.filter((p) => p.status === (fixoTab === "feitas" ? "feita" : "andamento")).length === 0 && (
                  <div style={{ padding: "26px 18px", fontSize: 13, color: t.faint, textAlign: "center" }}>Nenhuma proposta {fixoTab === "feitas" ? "finalizada" : "em andamento"} ainda. Clique em “Nova proposta” para começar.</div>
                )}
                {propostasFixas.filter((p) => p.status === (fixoTab === "feitas" ? "feita" : "andamento")).map((p) => {
                  const tot = p.entities.reduce((s, e) => s + computeEntity(e, params, escopoFixos, (PACOTES.find((x) => x.id === (p.pacote || "contabil")) || PACOTES[0]).keys).honorarioFinal, 0);
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "13px 18px", borderTop: `1px solid ${t.borderSoft}` }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{p.grupo.nome}</div>
                        <div style={{ fontSize: 11.5, color: t.faint }}>{p.entities.length} empresa(s) · criada em {p.criadaEm}{p.status === "enviada" && p.enviadaEm ? ` · enviada ${p.enviadaEm}` : ""} · {brl(tot)}/mês</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: p.status === "enviada" ? "rgba(91,140,255,.16)" : p.status === "feita" ? "rgba(34,197,94,.14)" : t.cardAlt, color: p.status === "enviada" ? t.accent : p.status === "feita" ? t.green : t.dim, border: `1px solid ${t.border}` }}>{p.status === "enviada" ? "Enviada" : p.status === "feita" ? "Finalizada" : "Em andamento"}</span>
                        <button onClick={() => { setPropFixaSel(p.id); setFixoView("editor"); }} style={{ background: t.accentSoft, color: t.accent, border: `1px solid ${t.accent}`, borderRadius: 9, padding: "7px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Abrir</button>
                        {(p.status === "feita" || p.status === "enviada") && (
                          <button onClick={() => abrirEnvio(p)} style={{ display: "flex", alignItems: "center", gap: 6, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "7px 13px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Send size={14} /> {p.status === "enviada" ? "Reenviar" : "Enviar"}</button>
                        )}
                        {p.status === "andamento" && (
                          <button onClick={() => excluirProp(p.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "transparent", color: t.red, border: `1px solid ${t.border}`, borderRadius: 9, padding: "7px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Trash2 size={13} /> Excluir</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {fixoView === "editor" && propFixa && (<>
          <button onClick={() => setFixoView("home")} style={{ background: "transparent", border: "none", color: t.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 10 }}>← Propostas de serviços fixos</button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{grupo.nome}</h1>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setAvulso(null); setPage("propostas"); }} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accentSoft, color: t.accent, border: `1px solid ${t.accent}`, borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><FileText size={15} /> Gerar proposta</button>
              <button onClick={finalizarProp} style={{ display: "flex", alignItems: "center", gap: 7, background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Check size={15} /> Finalizar proposta</button>
            </div>
          </div>
          <p style={{ fontSize: 13.5, color: t.dim, margin: "4px 0 20px" }}>{pacoteAtual.nome} · selecione os departamentos e precifique as horas por unidade.</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
            <MetricCard t={t} label={consolidado ? "Honorário do grupo / mês" : "Honorário / mês"} value={brl(view.honorarioFinal)} sub={consolidado ? `${entities.length} unidade(s) · com impostos` : `${sel.regime} · com impostos`} icon={DollarSign} />
            <MetricCard t={t} label="Margem bruta" value={pct(view.rol ? view.mc / view.rol : 0)} sub={brl(view.mc)} color={t.green} icon={TrendingUp} />
            <MetricCard t={t} label="Horas / mês" value={num(view.totalHoras)} sub={consolidado ? "somando todas as unidades" : sel.nome} icon={Clock} />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {entities.map((e) => {
              const active = e.id === selId;
              return (
                <button key={e.id} onClick={() => setSelId(e.id)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, border: `1px solid ${active ? t.accent : t.border}`, background: active ? t.accentSoft : t.card, color: active ? t.accent : t.dim }}>
                  <Building2 size={14} />
                  <span style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.nome}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: t.faint }}>{e.tipo === "matriz" ? "MATRIZ" : "FILIAL"}</span>
                </button>
              );
            })}
            {entities.length > 1 && (
              <button onClick={() => setSelId("consolidado")}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, border: `1px solid ${t.accent}`, background: consolidado ? t.accent : t.accentSoft, color: consolidado ? "#fff" : t.accent }}>
                <LineChart size={14} /> Consolidado
              </button>
            )}
            <button onClick={() => { setAddStep("tipo"); setAddModal(true); }}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, border: `1px dashed ${t.border}`, background: "transparent", color: t.accent }}>
              <Plus size={15} /> Adicionar empresa
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isWide ? "1fr 340px" : "1fr", gap: 20, alignItems: "start" }}>
            <div>
              {consolidado ? (
                <div>
                  <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Consolidado do grupo</div>
                    <div style={{ fontSize: 12, color: t.faint, marginBottom: 14 }}>{grupo.nome} · {entities.length} unidades somadas como uma só.</div>
                    {entities.map((e) => (
                      <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: `1px solid ${t.borderSoft}` }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{e.nome}</div>
                          <div style={{ fontSize: 11, color: t.faint }}>{e.regime} · {e.tipo === "matriz" ? "Matriz" : "Filial"}</div>
                        </div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{brl(perEntity.find((pp) => pp.id === e.id).calc.honorarioFinal)}</div>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: 6, borderTop: `2px solid ${t.border}`, fontSize: 13.5, fontWeight: 700 }}>
                      <span>Total do grupo</span><span style={{ color: t.accent, fontVariantNumeric: "tabular-nums" }}>{brl(group.honorarioFinal)}</span>
                    </div>
                  </div>
                  <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "18px 20px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Honorários por serviço (grupo)</div>
                    {SERVICOS.filter((s) => groupPorServico[s.key].enabled).map((s) => (
                      <div key={s.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: `1px solid ${t.borderSoft}`, fontSize: 13 }}>
                        <span style={{ color: t.dim }}>{s.nome} <span style={{ color: t.faint, fontSize: 11 }}>· {num(groupPorServico[s.key].horas)} h</span></span>
                        <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{brl(groupPorServico[s.key].honorarioImp)}</span>
                      </div>
                    ))}
                    {SERVICOS.filter((s) => groupPorServico[s.key].enabled).length === 0 && <div style={{ fontSize: 12.5, color: t.faint }}>Nenhum serviço contratado nas unidades.</div>}
                  </div>
                </div>
              ) : (<>
              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
                <label style={{ flex: 2, minWidth: 200 }}>
                  <div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Razão social</div>
                  <input value={sel.nome} onChange={(e) => updateEntity(sel.id, "nome", e.target.value)} style={fieldStyle(t)} />
                </label>
                <label style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Regime tributário</div>
                  <select value={sel.regime} onChange={(e) => updateEntity(sel.id, "regime", e.target.value)} style={fieldStyle(t)}>
                    {REGIMES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </label>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Segmento(s)</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {SEG_OPTS.map((s) => {
                      const on = (sel.segmentos || []).includes(s.tag);
                      return <button key={s.tag} onClick={() => toggleEntitySeg(sel.id, s.tag)} style={{ flex: 1, padding: "8px 6px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${on ? t.accent : t.border}`, background: on ? t.accent : "transparent", color: on ? "#fff" : t.dim }}>{s.nome}</button>;
                    })}
                  </div>
                </div>
                <label style={{ flex: 1, minWidth: 130 }}>
                  <div style={{ fontSize: 11.5, color: t.faint, marginBottom: 5 }}>Faturamento mensal</div>
                  <input type="number" value={sel.faturamento} onChange={(e) => updateEntity(sel.id, "faturamento", e.target.value)} style={{ ...fieldStyle(t), textAlign: "right" }} />
                </label>
                {sel.tipo === "filial" && (
                  <button onClick={() => removeEntity(sel.id)} title="Remover filial"
                    style={{ background: "transparent", border: `1px solid ${t.border}`, color: t.red, borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontFamily: "inherit" }}>
                    <Trash2 size={14} /> Remover
                  </button>
                )}
              </div>

              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, marginBottom: 16 }}>
                <div onClick={() => setFormAberto((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 16px", cursor: "pointer" }}>
                  <span style={{ width: 32, height: 32, borderRadius: 9, background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ClipboardList size={16} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>Dados do cliente — formulário</div>
                    <div style={{ fontSize: 11.5, color: t.faint }}>{sel.formulario ? sel.formulario.arquivo : "Nenhum formulário importado"}</div>
                  </div>
                  <ChevronDown size={17} color={t.faint} style={{ transform: formAberto ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
                </div>
                {formAberto && (
                  <div style={{ borderTop: `1px solid ${t.borderSoft}`, padding: "14px 16px" }}>
                    {sel.formulario ? (
                      <>
                        {FICHA.map((g) => {
                          const linhas = g.campos.filter((c) => { const v = sel.formulario[c.k]; return v !== undefined && v !== "" && v !== "—" && !(Array.isArray(v) && v.length === 0); });
                          if (!linhas.length) return null;
                          return (
                            <div key={g.sec} style={{ marginBottom: 12 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>{g.sec}</div>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "4px 18px" }}>
                                {linhas.map((c) => c.t === "textarea" ? (
                                  <div key={c.k} style={{ gridColumn: "1 / -1", fontSize: 12.5, padding: "4px 0", borderBottom: `1px solid ${t.borderSoft}` }}>
                                    <div style={{ color: t.faint, marginBottom: 2 }}>{c.l}</div>
                                    <div style={{ color: t.text, lineHeight: 1.5 }}>{String(sel.formulario[c.k])}</div>
                                  </div>
                                ) : (
                                  <div key={c.k} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12.5, borderBottom: `1px solid ${t.borderSoft}`, padding: "4px 0" }}>
                                    <span style={{ color: t.faint }}>{c.l}</span>
                                    <span style={{ color: t.text, fontWeight: 600, textAlign: "right" }}>{c.k === "faturamentoMensal" ? brl(sel.formulario[c.k]) : Array.isArray(sel.formulario[c.k]) ? sel.formulario[c.k].join(", ") : String(sel.formulario[c.k])}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div style={{ fontSize: 12.5, color: t.faint, lineHeight: 1.5 }}>Sem formulário cadastrado. Use "Adicionar empresa" → Importar formulário ou Cadastro manual.</div>
                    )}
                  </div>
                )}
              </div>

              {SERVICOS.filter((svc) => pacoteKeys.includes(svc.key)).map((svc) => {
                const tagSel = regimeTag(sel.regime);
                const segsSel = sel.segmentos && sel.segmentos.length ? sel.segmentos : SEG_ALL;
                const ativsSvc = ((escopoFixos && escopoFixos[svc.key]) || []).filter((a) => a.regimes.includes(tagSel) && (a.segmentos || SEG_ALL).some((x) => segsSel.includes(x)));
                return (
                <ServiceCard key={svc.key} t={t} svc={svc} sv={sel.services[svc.key]} calc={selCalc.porServico[svc.key]} ativs={ativsSvc}
                  expanded={!!expanded[svc.key]}
                  onToggleExpand={() => setExpanded((p) => ({ ...p, [svc.key]: !p[svc.key] }))}
                  onToggleEnabled={() => toggleService(sel.id, svc.key)}
                  onUpdateService={(f, v) => updateService(sel.id, svc.key, f, v)}
                  onUpdateHoras={(aid, v) => updateHoras(sel.id, svc.key, aid, v)} />
                );
              })}
              </>)}
            </div>

            <div style={{ position: isWide ? "sticky" : "static", top: 16, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>DRE — {consolidado ? "Consolidado" : (sel.tipo === "matriz" ? "Matriz" : "Filial")}</div>
                <div style={{ fontSize: 11.5, color: t.faint, marginBottom: 10 }}>{consolidado ? `${grupo.nome} · ${entities.length} unidades` : sel.nome}</div>
                <DRELine t={t} label="Receita bruta" value={brl(view.honorarioFinal)} />
                <DRELine t={t} label="(−) Imposto" value={brl(-view.impostos)} color={t.red} percent={view.honorarioFinal ? view.impostos / view.honorarioFinal : 0} />
                <DRELine t={t} label="ROL" value={brl(view.rol)} strong />
                <DRELine t={t} label="(−) Custo (horas)" value={brl(-view.custo)} color={t.red} percent={view.rol ? view.custo / view.rol : 0} />
                <DRELine t={t} label="Margem bruta" value={brl(view.mc)} strong percent={view.rol ? view.mc / view.rol : 0} />
              </div>

              <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>Parâmetros</div>
                {[["imposto", "Imposto sobre o serviço"]].map(([k, label]) => (
                  <label key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9, fontSize: 12.5, color: t.dim }}>
                    {label}
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <input type="number" min="0" max="99" step="0.5" value={params[k]} onChange={(e) => setParams({ ...params, [k]: Number(e.target.value) || 0 })}
                        style={{ ...fieldStyle(t), width: 64, padding: "5px 8px", textAlign: "right" }} />
                      <span style={{ color: t.faint }}>%</span>
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ background: t.accentSoft, border: `1px solid ${t.accent}`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10, color: theme === "dark" ? t.text : t.accent }}>Total do grupo</div>
                {entities.map((e) => {
                  const c = perEntity.find((p) => p.id === e.id).calc;
                  return (
                    <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 12.5 }}>
                      <span style={{ color: t.dim, maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.nome}</span>
                      <span style={{ fontWeight: 600, color: t.text, fontVariantNumeric: "tabular-nums" }}>{brl(c.honorarioFinal)}</span>
                    </div>
                  );
                })}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0 0", marginTop: 6, borderTop: `1px solid ${t.accent}`, fontSize: 14.5, fontWeight: 800 }}>
                  <span>Total / mês</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>{brl(group.honorarioFinal)}</span>
                </div>
              </div>
            </div>
          </div>
          </>)}
          {addModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(8,11,20,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 60, overflowY: "auto" }} onClick={() => { setAddModal(false); setNovaProp(false); }}>
              <div onClick={(e) => e.stopPropagation()} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 24px", width: "100%", maxWidth: addStep === "manual" ? 660 : 460, maxHeight: "86vh", overflowY: "auto", boxShadow: "0 24px 70px rgba(0,0,0,.45)", margin: "auto" }}>
                {addStep === "tipo" && (
                  <div>
                    <div style={modalEy}>Adicionar empresa ao grupo</div>
                    <div style={{ fontSize: 15, fontWeight: 600, margin: "6px 0 16px" }}>É uma filial ou outra empresa do grupo?</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => { setAddTipo("filial"); setAddStep("metodo"); }} style={choiceBtn}>Filial</button>
                      <button onClick={() => { setAddTipo("matriz"); setAddStep("metodo"); }} style={choiceBtn}>Outra empresa</button>
                    </div>
                    <button onClick={() => { setAddModal(false); setNovaProp(false); }} style={{ marginTop: 14, background: "transparent", color: t.dim, border: "none", fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                  </div>
                )}
                {addStep === "pacote" && (
                  <div>
                    <div style={modalEy}>Nova proposta — tipo</div>
                    <div style={{ fontSize: 15, fontWeight: 600, margin: "6px 0 16px" }}>Qual pacote você quer propor?</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {PACOTES.map((pk) => (
                        <button key={pk.id} onClick={() => { setNovoPacote(pk.id); setAddStep("metodo"); }}
                          style={{ textAlign: "left", padding: "14px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${t.border}`, background: t.cardAlt, color: t.text }}>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{pk.nome}</div>
                          <div style={{ fontSize: 11, color: t.faint, marginTop: 3, lineHeight: 1.35 }}>{pk.desc}</div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => { setNovaProp(false); setAddModal(false); }} style={{ marginTop: 14, background: "transparent", color: t.dim, border: "none", fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                  </div>
                )}
                {addStep === "metodo" && (
                  <div>
                    <div style={modalEy}>{novaProp ? "Nova proposta — cliente" : (addTipo === "filial" ? "Nova filial" : "Nova empresa do grupo")}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, margin: "6px 0 16px" }}>{novaProp ? `${(PACOTES.find((x) => x.id === novoPacote) || PACOTES[0]).nome} — importe o formulário ou cadastre manualmente.` : "Como você quer cadastrar?"}</div>
                    <label
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                      onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) criarImportando(addTipo, f); }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9, padding: "30px 18px", borderRadius: 12, cursor: "pointer", textAlign: "center", border: `1.5px dashed ${dragOver ? t.accent : t.border}`, background: dragOver ? t.accentSoft : t.cardAlt, color: t.text }}>
                      <span style={{ width: 46, height: 46, borderRadius: "50%", background: t.accentSoft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><UploadCloud size={23} /></span>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{dragOver ? "Solte o arquivo para importar" : "Arraste o arquivo aqui ou clique para selecionar"}</div>
                      <div style={{ fontSize: 11.5, color: t.faint }}>PDF, XLSX, CSV ou DOCX</div>
                      <input type="file" accept=".pdf,.xlsx,.csv,.docx" onChange={(e) => criarImportando(addTipo, e.target.files[0])} style={{ display: "none" }} />
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
                      <div style={{ flex: 1, height: 1, background: t.border }} />
                      <span style={{ fontSize: 11.5, color: t.faint }}>ou</span>
                      <div style={{ flex: 1, height: 1, background: t.border }} />
                    </div>
                    <button onClick={() => { setCadForm(BLANK_CAD); setAddStep("manual"); }} style={{ ...choiceBtn, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Plus size={16} /> Cadastro manual</button>
                    <button onClick={() => { if (novaProp) setAddStep("pacote"); else setAddStep("tipo"); }} style={{ marginTop: 14, background: "transparent", color: t.dim, border: "none", fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}>← Voltar</button>
                  </div>
                )}
                {addStep === "manual" && (
                  <div>
                    <div style={modalEy}>Cadastro manual — {novaProp ? "cliente da proposta" : (addTipo === "filial" ? "filial" : "empresa do grupo")}</div>
                    <div style={{ fontSize: 11.5, color: t.faint, margin: "4px 0 14px" }}>Ficha Técnica (Outsourcing Contábil)</div>
                    {FICHA.map((g) => (
                      <div key={g.sec} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>{g.sec}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          {g.campos.map((c) => (
                            <label key={c.k} style={{ gridColumn: (c.t === "textarea" || c.t === "multi") ? "1 / -1" : "auto" }}>
                              <div style={lblS(t)}>{c.l}</div>
                              {campoInput(c)}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                      <button onClick={() => setAddStep("metodo")} style={{ background: "transparent", color: t.dim, border: "none", fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}>← Voltar</button>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { setAddModal(false); setNovaProp(false); }} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
                        <button onClick={criarManual} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Criar {novaProp ? "proposta" : (addTipo === "filial" ? "filial" : "empresa")}</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          </>)}
          {enviarSel && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(8,11,20,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 70 }} onClick={() => setEnviarSel(null)}>
              <div onClick={(e) => e.stopPropagation()} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 24px", width: "100%", maxWidth: 440, boxShadow: "0 24px 70px rgba(0,0,0,.45)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}><Send size={18} color={t.accent} /><div style={{ fontSize: 15, fontWeight: 700 }}>Enviar proposta</div></div>
                <div style={{ fontSize: 12.5, color: t.faint, marginBottom: 14, lineHeight: 1.5 }}>Escolha por onde enviar — pode marcar os dois.</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  {[{ k: "email", lbl: "E-mail", on: canalEmail, set: setCanalEmail, Ic: Mail }, { k: "whats", lbl: "WhatsApp", on: canalWhats, set: setCanalWhats, Ic: MessageCircle }].map(({ k, lbl, on, set, Ic }) => (
                    <button key={k} onClick={() => set(!on)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 14px", borderRadius: 11, cursor: "pointer", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, border: `1.5px solid ${on ? t.accent : t.border}`, background: on ? t.accentSoft : t.cardAlt, color: on ? t.accent : t.text }}><Ic size={16} /> {lbl}{on && <Check size={15} />}</button>
                  ))}
                </div>
                {canalEmail && (<label style={{ display: "block" }}><div style={lblS(t)}>E-mail do destinatário</div><input value={enviarEmail} onChange={(e) => setEnviarEmail(e.target.value)} placeholder="cliente@empresa.com.br" style={fieldStyle(t)} /></label>)}
                {canalWhats && (<label style={{ display: "block", marginTop: 10 }}><div style={lblS(t)}>WhatsApp (com DDD)</div><input value={enviarWhats} onChange={(e) => setEnviarWhats(e.target.value)} placeholder="(11) 99999-9999" style={fieldStyle(t)} /></label>)}
                {!canalEmail && !canalWhats && (<div style={{ fontSize: 12, color: t.faint }}>Selecione ao menos um canal.</div>)}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
                  <button onClick={() => setEnviarSel(null)} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Agora não</button>
                  {(() => { const ok = (canalEmail && enviarEmail) || (canalWhats && enviarWhats); return (
                    <button onClick={enviarProposta} disabled={!ok} style={{ display: "flex", alignItems: "center", gap: 7, background: ok ? t.accent : t.cardAlt, color: ok ? "#fff" : t.faint, border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: ok ? "pointer" : "default", fontFamily: "inherit" }}><Send size={15} /> Enviar</button>
                  ); })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {confirmEx && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,11,20,.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 90 }} onClick={() => setConfirmEx(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 24px", width: "100%", maxWidth: 400, boxShadow: "0 24px 70px rgba(0,0,0,.45)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}><Trash2 size={18} color={t.red} /><div style={{ fontSize: 15, fontWeight: 700 }}>Excluir proposta</div></div>
            <div style={{ fontSize: 13, color: t.dim, lineHeight: 1.5, marginBottom: 18 }}>Tem certeza que deseja excluir a proposta{confirmEx.nome ? ` de ${confirmEx.nome}` : ""}? Esta ação não pode ser desfeita.</div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setConfirmEx(null)} style={{ background: "transparent", color: t.dim, border: `1px solid ${t.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
              <button onClick={confirmarExcluir} style={{ display: "flex", alignItems: "center", gap: 7, background: t.red, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}><Trash2 size={15} /> Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
